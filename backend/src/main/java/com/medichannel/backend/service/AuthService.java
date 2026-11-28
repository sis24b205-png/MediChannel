package com.medichannel.backend.service;

import com.medichannel.backend.repository.UserRepository;
import com.medichannel.backend.repository.PatientRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.medichannel.backend.dto.RegisterRequest;
import com.medichannel.backend.entity.User;
import com.medichannel.backend.entity.Patient;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import java.nio.charset.StandardCharsets;
import java.util.Locale;
import com.medichannel.backend.dto.LoginRequest;
import com.medichannel.backend.dto.AuthResponse;
import java.time.OffsetDateTime;

import com.medichannel.backend.dto.ChangePasswordRequest;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final PasswordEncoder passwordEncoder;
    private final EncryptionService encryptionService;
    private final LookupHashService lookupHashService;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            PatientRepository patientRepository,
            PasswordEncoder passwordEncoder,
            EncryptionService encryptionService,
            LookupHashService lookupHashService,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.patientRepository = patientRepository;
        this.passwordEncoder = passwordEncoder;
        this.encryptionService = encryptionService;
        this.lookupHashService = lookupHashService;
        this.jwtService = jwtService;
    }
    @Transactional
public void register(RegisterRequest request) {

    String email = request.email()
            .trim().toLowerCase(Locale.ROOT);

    String nic = request.nic()
            .trim().toUpperCase(Locale.ROOT);

    String emailHash = lookupHashService.hashEmail(email);
    String nicHash = lookupHashService.hashNic(nic);

    // Check duplicate email
    if (userRepository.existsByEmailHash(emailHash)) {
        throw new ResponseStatusException(
                HttpStatus.CONFLICT,
                "Registration details already exist");
    }

    // Check duplicate NIC
    if (patientRepository.existsByNicHash(nicHash)) {
        throw new ResponseStatusException(
                HttpStatus.CONFLICT,
                "Registration details already exist");
    }

    // Validate BCrypt password byte limit
    if (request.password()
            .getBytes(StandardCharsets.UTF_8).length > 72) {
        throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Password is too long");
    }

    // Create user account
    User user = new User();

    user.setEmailEncrypted(
            encryptionService.encrypt(email));

    user.setEmailHash(emailHash);

    user.setPasswordHash(
            passwordEncoder.encode(request.password()));

    user.setRole("CUSTOMER");
    user.setActive(true);
    user.setFailedLoginAttempts(0);
    user.setMustChangePassword(false);

    User savedUser = userRepository.save(user);

    // Create patient profile
    Patient patient = new Patient();

    patient.setUserId(savedUser.getUserId());

    patient.setFullNameEncrypted(
            encryptionService.encrypt(request.fullName()));

    patient.setNicEncrypted(
            encryptionService.encrypt(nic));

    patient.setNicHash(nicHash);

    patient.setDateOfBirthEncrypted(
            encryptionService.encrypt(
                    request.dateOfBirth().toString()));

    patient.setGender(request.gender().trim());

    patient.setPhoneEncrypted(
            encryptionService.encrypt(request.phone()));

    patient.setAddressEncrypted(
            encryptionService.encrypt(request.address()));

    patientRepository.save(patient);
}

@Transactional(noRollbackFor = ResponseStatusException.class)
public AuthResponse login(LoginRequest request) {

    String emailHash =
            lookupHashService.hashEmail(request.email());

    User user = userRepository.findOneByEmailHash(emailHash)
            .orElseThrow(() -> invalidLogin());

    OffsetDateTime now = OffsetDateTime.now();

    // Check active account
    if (!user.isActive()) {
        throw invalidLogin();
    }

    // Check account lock
    if (user.getLockedUntil() != null) {

        if (user.getLockedUntil().isAfter(now)) {
            throw invalidLogin();
        }

        user.setLockedUntil(null);
        user.setFailedLoginAttempts(0);
    }

    // Verify password
    boolean validPassword =
            request.password()
                    .getBytes(StandardCharsets.UTF_8).length <= 72
            && passwordEncoder.matches(
                    request.password(),
                    user.getPasswordHash());

    if (!validPassword) {

        int attempts = user.getFailedLoginAttempts() + 1;

        user.setFailedLoginAttempts(attempts);

        if (attempts >= 5) {
            user.setLockedUntil(now.plusMinutes(15));
        }

        userRepository.save(user);

        throw invalidLogin();
    }

    // Reset failed login attempts
    user.setFailedLoginAttempts(0);
    user.setLockedUntil(null);

    userRepository.save(user);

    // Generate JWT token
    String token = jwtService.issue(
            user.getUserId(),
            user.getRole());

    return new AuthResponse(
            token,
            jwtService.expiresIn(),
            user.getRole(),
            user.isMustChangePassword());
}

private ResponseStatusException invalidLogin() {

    return new ResponseStatusException(
            HttpStatus.UNAUTHORIZED,
            "Invalid email or password");
}

@Transactional
public void changePassword(
        Long userId,
        ChangePasswordRequest request) {

    User user = userRepository.findOneByUserId(userId)
            .orElseThrow(() -> new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Account not found"));

    if (!user.isActive()) {
        throw new ResponseStatusException(
                HttpStatus.UNAUTHORIZED,
                "Account access denied");
    }

    if (user.getLockedUntil() != null &&
            user.getLockedUntil().isAfter(
                    OffsetDateTime.now())) {

        throw new ResponseStatusException(
                HttpStatus.UNAUTHORIZED,
                "Account access denied");
    }

    if (request.currentPassword()
            .getBytes(StandardCharsets.UTF_8).length > 72
            || request.newPassword()
            .getBytes(StandardCharsets.UTF_8).length > 72) {

        throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Password is too long");
    }

    if (!passwordEncoder.matches(
            request.currentPassword(),
            user.getPasswordHash())) {

        throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Current password is incorrect");
    }

    if (passwordEncoder.matches(
            request.newPassword(),
            user.getPasswordHash())) {

        throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "New password must be different");
    }

    user.setPasswordHash(
            passwordEncoder.encode(
                    request.newPassword()));

    user.setMustChangePassword(false);
    user.setFailedLoginAttempts(0);
    user.setLockedUntil(null);

    userRepository.save(user);
}
}
