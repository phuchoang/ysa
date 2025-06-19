# Contributing to BootGenie

Thank you for your interest in contributing to BootGenie! This document provides guidelines for contributing to the project.

## 🤝 Code of Conduct

By participating in this project, you agree to abide by our code of conduct:
- Be respectful and inclusive
- Focus on constructive feedback
- Help maintain a welcoming environment for all contributors
- Report any unacceptable behavior to the maintainers

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Expo CLI (`npm install -g @expo/cli`)
- Git
- A GitHub account

### Setup Development Environment
1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ysa.git
   cd ysa
   ```
3. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
4. Start development server:
   ```bash
   npm start
   ```

## 📝 How to Contribute

### Reporting Bugs
Before submitting a bug report:
- Check existing issues to avoid duplicates
- Use the latest version to verify the bug still exists
- Gather detailed information about your environment

When creating a bug report, include:
- Clear, descriptive title
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots/logs if applicable
- Device/OS information
- BootGenie version

### Suggesting Features
We welcome feature suggestions! Please:
- Check existing feature requests first
- Provide clear use cases and benefits
- Consider implementation complexity
- Be open to discussion and feedback

### Contributing Code

#### 1. Choose an Issue
- Look for issues labeled `good first issue` for beginners
- Comment on the issue to indicate you're working on it
- Ask questions if anything is unclear

#### 2. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

#### 3. Make Changes
- Follow the existing code style
- Add tests for new functionality
- Update documentation as needed
- Ensure all tests pass

#### 4. Commit Changes
Follow conventional commit format:
```bash
git commit -m "feat: add Redmi Note 13 unlock support"
git commit -m "fix: resolve log parsing error"
git commit -m "docs: update installation instructions"
```

#### 5. Submit Pull Request
- Push your branch to your fork
- Create a pull request to the main repository
- Provide a clear description of changes
- Link related issues

## 🏗️ Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow existing naming conventions
- Use ESLint and Prettier configurations
- Add comments for complex logic

### Testing
- Write unit tests for new functions
- Test on multiple devices/platforms
- Verify accessibility compliance
- Test with different Android versions

### Documentation
- Update README.md for user-facing changes
- Add inline code comments
- Update API documentation
- Include screenshots for UI changes

## 📱 Device Support Contributions

### Adding New Device Support
1. **Research**: Verify unlock method exists and is safe
2. **Device Service**: Add device detection logic
3. **Unlock Guide**: Create step-by-step instructions
4. **Testing**: Test with actual device if possible
5. **Documentation**: Update supported devices list

### Device Information Needed
- Exact device model and variants
- Bootloader unlock method
- Required tools and dependencies
- Known issues and limitations
- Community forum links

Example device addition:
```typescript
// services/DeviceService.ts
{
  id: 'xiaomi_004',
  model: 'Redmi Note 13',
  brand: 'Xiaomi',
  manufacturer: 'Xiaomi',
  bootloaderStatus: 'locked',
  unlockMethod: 'mi_unlock_tool',
  variants: ['Global', 'India', 'China']
}
```

## 🌍 Translation Contributions

We support multiple languages and welcome translations:

### Adding New Language
1. Create new translation file: `i18n/translations/LANG_CODE.json`
2. Copy structure from `en.json`
3. Translate all strings
4. Update `i18n/config.ts` to include new language
5. Test language switching functionality

### Translation Guidelines
- Keep technical terms consistent
- Consider cultural context
- Test with actual native speakers
- Maintain formatting and placeholders

## 🔒 Security Contributions

### Security Considerations
- Never include sensitive data in code
- Validate all user inputs
- Follow secure coding practices
- Report security issues privately

### Security Review Process
- All security-related changes require thorough review
- Dependency updates are carefully vetted
- Build pipeline security is regularly audited

## 📋 Pull Request Checklist

Before submitting your PR, ensure:
- [ ] Code follows project style guidelines
- [ ] All tests pass locally
- [ ] Documentation is updated
- [ ] Commit messages follow conventional format
- [ ] PR description explains the changes
- [ ] Screenshots included for UI changes
- [ ] No sensitive information is exposed

## 🏷️ Issue Labels

We use these labels to categorize issues:
- `bug`: Something isn't working
- `enhancement`: New feature or improvement
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention needed
- `device-support`: Adding new device support
- `translation`: Translation-related
- `documentation`: Documentation improvements

## 🎯 Contribution Areas

### High Priority
- New device unlock guides
- Bug fixes for existing devices
- Translation improvements
- Documentation updates
- User experience improvements

### Medium Priority
- Code refactoring
- Performance optimizations
- Additional testing
- Build process improvements

### Ideas for Contributors
- Create video tutorials
- Improve error messages
- Add accessibility features
- Optimize for tablets
- Create desktop version (Electron)

## 💬 Community

### Communication Channels
- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and community chat
- **XDA Developers**: Device-specific discussions
- **Reddit r/Xiaomi**: Community support

### Getting Help
- Check existing issues and documentation first
- Ask specific, detailed questions
- Provide context and system information
- Be patient and respectful

## 📜 License

By contributing to BootGenie, you agree that your contributions will be licensed under the same license as the project (MIT License).

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Special thanks in documentation
- GitHub contributor statistics

## 📞 Contact Maintainers

- **Lead Maintainer**: @phuchoang
- **Security Issues**: security@bootgenie.app
- **General Questions**: Create a GitHub discussion

---

Thank you for contributing to BootGenie! Your efforts help make bootloader unlocking safer and more accessible for everyone. 🚀
