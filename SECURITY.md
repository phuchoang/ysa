# Security Policy

## Supported Versions

We actively support and provide security updates for the following versions of BootGenie:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

The BootGenie team takes security seriously. If you discover a security vulnerability, please follow these steps:

### 1. Do NOT create a public issue

Please **do not** report security vulnerabilities through public GitHub issues, discussions, or pull requests.

### 2. Send a private report

Instead, please send an email to: **security@bootgenie.app**

Include the following information:
- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment
- Any suggested fixes (if applicable)

### 3. Response Timeline

- **Acknowledgment**: We will acknowledge receipt within 48 hours
- **Initial Assessment**: We will provide an initial assessment within 5 business days
- **Resolution Timeline**: We aim to resolve critical vulnerabilities within 30 days

### 4. Disclosure Policy

- We follow responsible disclosure practices
- We will coordinate with you on the disclosure timeline
- We will credit you in our security advisories (unless you prefer to remain anonymous)

## Security Considerations

### App Permissions

BootGenie requires minimal permissions:
- **USB Debugging Access**: Required for ADB/Fastboot operations
- **Internet Access**: For downloading unlock tools and guides
- **Storage Access**: For logging and temporary files

### Data Handling

- **No Personal Data Collection**: We do not collect personal information
- **Local Storage Only**: All logs and data stay on your device
- **No Analytics**: We do not track user behavior
- **No Remote Servers**: All operations are performed locally

### Code Security

- **Open Source**: All code is publicly auditable
- **Dependencies**: Regularly updated to latest secure versions
- **Static Analysis**: Automated security scanning in CI/CD
- **Code Review**: All changes require review before merging

### Device Security Implications

**⚠️ Important Security Warning:**

Unlocking your device's bootloader has significant security implications:

- **Warranty Void**: Will void your device warranty
- **Security Reduced**: Removes Android's verified boot protection
- **Malware Risk**: Increased risk of malware installation
- **Data Wipe**: Will completely erase all device data
- **Banking Apps**: May prevent banking/payment apps from working

### Safe Usage Guidelines

1. **Backup Everything**: Always backup all important data first
2. **Trusted Sources**: Only download unlock tools from official sources
3. **Research First**: Understand the risks for your specific device
4. **Community Support**: Check XDA Developers for device-specific guidance
5. **Legal Compliance**: Ensure bootloader unlocking is legal in your region

## Threat Model

### In Scope
- Vulnerabilities in BootGenie app code
- Dependency vulnerabilities
- Build/deployment pipeline security
- User data protection

### Out of Scope
- Device-specific unlock tool vulnerabilities (we don't develop these)
- Third-party ADB/Fastboot tool security
- Physical device security after bootloader unlock
- Android OS vulnerabilities

## Security Best Practices for Contributors

### Code Contributions
- Follow secure coding practices
- No hardcoded secrets or credentials
- Input validation for all user inputs
- Proper error handling without information disclosure

### Dependencies
- Keep dependencies updated
- Review new dependencies for security issues
- Use npm audit to check for vulnerabilities
- Pin dependency versions

### Build Security
- Secure CI/CD pipeline configuration
- Code signing for releases
- Reproducible builds
- Supply chain security

## Incident Response

In case of a security incident:

1. **Immediate Response**: Take affected systems offline if necessary
2. **Assessment**: Determine scope and impact
3. **Communication**: Notify affected users promptly
4. **Remediation**: Deploy fixes and security updates
5. **Post-Incident**: Review and improve security measures

## Contact Information

- **Security Email**: security@bootgenie.app
- **General Contact**: issues via GitHub
- **Emergency Contact**: For critical vulnerabilities requiring immediate attention

## Legal Safe Harbor

We support safe harbor for security researchers who:
- Make a good faith effort to avoid privacy violations and disruptions
- Contact us before publicly disclosing any vulnerabilities
- Give us reasonable time to respond before any disclosure

## Acknowledgments

We thank the security community for helping keep BootGenie secure. Security researchers who responsibly disclose vulnerabilities will be acknowledged in our security advisories.

---

**Last Updated**: June 20, 2025
**Next Review**: December 20, 2025
