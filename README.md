# MexBot

MexBot is a proprietary AI web automation tool that runs in your browser. A secure alternative to OpenAI Operator with flexible LLM options and multi-agent system.

**Made by Patfer Coding Company, Patrick Blanks (c) 2025 Patrick Blanks**

## 🎉 Start Your Free 7-Day Trial

Experience the full power of MexBot with our **free 7-day trial** - no credit card required!

- ✅ **Unlimited web automation**
- ✅ **Access to all AI models**
- ✅ **Priority support**
- ✅ **Advanced features**
- ✅ **No usage limits**

[Start Free Trial](#installation-guide) | [View Pricing](#pricing)

## Why MexBot?

Looking for a powerful AI web agent without the $200/month price tag of OpenAI Operator? **MexBot**, as a chrome extension, delivers premium web automation capabilities while keeping you in complete control:

- **100% Secure** - Proprietary codebase with enterprise-grade security. Your data and credentials stay protected.
- **Privacy-Focused** - Everything runs in your local browser. Your credentials stay with you, never shared with any cloud service.
- **Flexible LLM Options** - Connect to your preferred LLM providers with the freedom to choose different models for different agents.
- **Proprietary Technology** - Advanced automation technology with complete control over your web workflows.

**Note:** We currently support OpenAI, Anthropic, Gemini, Ollama, Groq, Cerebras, Llama and custom OpenAI-Compatible providers, more providers will be supported.

## Pricing

### Free Trial
- **7 days** of full access
- **No credit card required**
- **All premium features included**
- **Cancel anytime**

### Monthly Plan - $19.99/month
- Unlimited web automation
- All AI models supported
- Priority support
- Advanced features
- Regular updates
- No usage limits

### Yearly Plan - $199.99/year (Save 17%)
- Everything in Monthly
- **2 months free**
- Early access to features
- Premium support
- Custom integrations
- API access

[View Full Pricing Details](#pricing)

## Key Features

- **Multi-agent System**: Specialized AI agents collaborate to accomplish complex web workflows
- **Interactive Side Panel**: Intuitive chat interface with real-time status updates
- **Task Automation**: Seamlessly automate repetitive web automation tasks across websites
- **Follow-up Questions**: Ask contextual follow-up questions about completed tasks
- **Conversation History**: Easily access and manage your AI agent interaction history
- **Multiple LLM Support**: Connect your preferred LLM providers and assign different models to different agents
- **Enterprise Security**: Proprietary codebase with advanced security measures

## Browser Support

**Officially Supported:**
- **Chrome** - Full support with all features
- **Edge** - Full support with all features

**Not Supported:**
- Firefox, Safari, and other Chromium variants (Opera, Arc, etc.)

**Note**: While MexBot may function on other Chromium-based browsers, we recommend using Chrome or Edge for the best experience and guaranteed compatibility.

## Installation Guide

### Method 1: Chrome Web Store (Recommended for most users)

1. **Visit the Chrome Web Store**
   * Go to the MexBot Chrome Web Store page
   * Click "Add to Chrome" button
   * Confirm the installation when prompted

2. **Start Your Free Trial**
   * Click the MexBot icon in your browser toolbar
   * The side panel will open automatically
   * Click "Start Free Trial" to begin your 7-day trial
   * No credit card required!

3. **Configure Your Setup**
   * Click the Settings icon (gear icon) in the top-right corner
   * Add your API keys for your preferred LLM providers
   * Configure which models to use for each agent (Navigator, Planner, Validator)

### Method 2: Manual Installation (For latest features)

1. **Download the Extension**
   * Download the latest `mexbot.zip` file from the official distribution page
   * Extract the ZIP file to a folder on your computer

2. **Enable Developer Mode**
   * Open Chrome and go to `chrome://extensions/`
   * Toggle "Developer mode" in the top-right corner

3. **Load the Extension**
   * Click "Load unpacked" in the top-left
   * Select the folder where you extracted the ZIP file
   * The extension should now appear in your extensions list

4. **Start Your Trial**
   * Click the MexBot icon in your toolbar
   * Click "Start Free Trial" to begin your 7-day trial
   * Configure your API keys in Settings

### Method 3: Build from Source (For developers)

1. **Prerequisites**
   * [Node.js](https://nodejs.org/) (v22.12.0 or higher)
   * [pnpm](https://pnpm.io/installation) (v9.15.1 or higher)

2. **Clone and Build**
   ```bash
   git clone https://github.com/pacmex_admin/MexBot.git
   cd MexBot
   pnpm install
   pnpm build
   ```

3. **Load the Built Extension**
   * Go to `chrome://extensions/`
   * Enable Developer mode
   * Click "Load unpacked"
   * Select the `dist` folder from the project

4. **Start Your Trial**
   * Click the MexBot icon in your toolbar
   * Click "Start Free Trial" to begin your 7-day trial

## Configuration

### Setting Up API Keys

1. **Open Settings**
   * Click the MexBot icon in your toolbar
   * Click the Settings icon (gear) in the top-right

2. **Add Your API Keys**
   * **OpenAI**: Get your API key from [OpenAI Platform](https://platform.openai.com/)
   * **Anthropic**: Get your API key from [Anthropic Console](https://console.anthropic.com/)
   * **Google Gemini**: Get your API key from [Google AI Studio](https://makersuite.google.com/)
   * **Other Providers**: Follow their respective documentation

3. **Configure Agent Models**
   * **Navigator**: Handles web navigation and interaction
   * **Planner**: Plans and coordinates complex tasks
   * **Validator**: Validates and verifies task completion

### Recommended Model Configurations

#### High Performance Setup
- **Navigator**: GPT-4, Claude-3.5-Sonnet, or Gemini Pro
- **Planner**: GPT-4 or Claude-3.5-Sonnet
- **Validator**: GPT-3.5-Turbo or Claude-3-Haiku

#### Cost-Effective Setup
- **Navigator**: GPT-3.5-Turbo or Claude-3-Haiku
- **Planner**: GPT-3.5-Turbo or Claude-3-Haiku
- **Validator**: GPT-3.5-Turbo or Claude-3-Haiku

#### Local Models (Ollama)
- **Navigator**: Llama 3.1 8B, Mistral 7B, or CodeLlama 7B
- **Planner**: Llama 3.1 8B or Mistral 7B
- **Validator**: Llama 3.1 8B or Mistral 7B

## Trial & Subscription Management

### Starting Your Trial
- Click "Start Free Trial" in the side panel
- No credit card required
- Full access to all features for 7 days
- Cancel anytime

### Upgrading to Premium
- Click "Upgrade Now" in the trial banner
- Choose your plan (Monthly or Yearly)
- Complete secure payment via Stripe
- Instant access to premium features

### Managing Your Subscription
- Access billing information in Settings
- Cancel anytime - no penalties
- Your access continues until the end of your billing period
- Contact support for any billing questions

## Troubleshooting

### Common Issues and Solutions

#### Extension Not Loading
- **Issue**: Extension doesn't appear after installation
- **Solution**: 
  * Check if Developer mode is enabled in `chrome://extensions/`
  * Try refreshing the extensions page
  * Restart Chrome completely
  * Check if the extension is enabled in the extensions list

#### Side Panel Not Opening
- **Issue**: Clicking the extension icon doesn't open the side panel
- **Solution**:
  * Right-click the extension icon and select "Pin to toolbar"
  * Check if the extension is enabled in `chrome://extensions/`
  * Try disabling and re-enabling the extension
  * Check if Chrome is up to date

#### API Key Errors
- **Issue**: "Invalid API key" or similar errors
- **Solution**:
  * Verify your API key is correct and has sufficient credits
  * Check if the API key has the necessary permissions
  * Ensure you're using the correct API endpoint for your provider
  * Try regenerating your API key
  * Check your account billing status

#### Models Not Responding
- **Issue**: Models are configured but not responding
- **Solution**:
  * Check your internet connection
  * Verify API keys have sufficient quota
  * Try switching to a different model temporarily
  * Check the browser console for error messages
  * Restart the extension

#### Performance Issues
- **Issue**: Slow response times or timeouts
- **Solution**:
  * Use faster models (GPT-4 instead of GPT-3.5-Turbo)
  * Check your internet connection speed
  * Close unnecessary browser tabs
  * Try restarting the extension
  * Clear browser cache and cookies

#### Permission Errors
- **Issue**: "Permission denied" or access errors
- **Solution**:
  * Ensure the extension has necessary permissions
  * Check if the website allows automation
  * Try refreshing the page and retrying
  * Check if the website has anti-bot protection

#### Theme Not Working
- **Issue**: Dark/light theme not applying correctly
- **Solution**:
  * Refresh the side panel
  * Check if your browser supports CSS custom properties
  * Try toggling the theme manually
  * Clear browser cache

#### Speech-to-Text Issues
- **Issue**: Voice input not working
- **Solution**:
  * Allow microphone permissions when prompted
  * Check if your microphone is working in other applications
  * Try refreshing the page
  * Check browser console for errors

#### History Not Loading
- **Issue**: Chat history not appearing
- **Solution**:
  * Check if you have any previous conversations
  * Try refreshing the side panel
  * Check browser storage permissions
  * Clear and reload the extension

#### Trial/Subscription Issues
- **Issue**: Trial not starting or subscription problems
- **Solution**:
  * Check if you're logged into the correct account
  * Clear browser cache and cookies
  * Try refreshing the extension
  * Contact support for billing issues

### Advanced Troubleshooting

#### Check Browser Console
1. Open the side panel
2. Press F12 to open Developer Tools
3. Go to the Console tab
4. Look for any error messages
5. Take a screenshot of errors for support

#### Reset Extension Settings
1. Go to `chrome://extensions/`
2. Find MexBot extension
3. Click "Details"
4. Click "Clear data"
5. Reload the extension

#### Check Network Connectivity
- Test your internet connection
- Try accessing the API provider's website directly
- Check if your firewall is blocking the extension
- Try using a different network

#### Update Chrome
- Ensure you're using the latest version of Chrome
- Update Chrome through `chrome://settings/help`
- Restart Chrome after updating

### Getting Help

If you're still experiencing issues:

1. **Check the Console**: Press F12 and check the Console tab for error messages
2. **Restart the Extension**: Go to `chrome://extensions/` and toggle the extension off/on
3. **Clear Browser Cache**: Clear your browser cache and cookies
4. **Contact Support**: Reach out to our support team with detailed error information
5. **Check Documentation**: Review this README and troubleshooting guide
6. **Community Support**: Join our Discord community for help from other users

### Error Codes and Meanings

- **ERR_API_KEY_INVALID**: Your API key is incorrect or expired
- **ERR_QUOTA_EXCEEDED**: You've exceeded your API usage limits
- **ERR_NETWORK**: Network connectivity issues
- **ERR_PERMISSION**: Extension doesn't have required permissions
- **ERR_MODEL_NOT_FOUND**: Selected model is not available
- **ERR_TIMEOUT**: Request timed out, try again
- **ERR_TRIAL_EXPIRED**: Your trial has expired, upgrade to continue
- **ERR_SUBSCRIPTION_REQUIRED**: Premium subscription required for this feature

## Usage Examples

### Basic Web Automation
```
"Go to Amazon and search for wireless headphones under $100"
```

### Data Extraction
```
"Extract all product names and prices from the first page of results"
```

### Form Filling
```
"Fill out the contact form with my information: [your details]"
```

### Research Tasks
```
"Research the top 5 companies in the AI industry and summarize their key products"
```

## Keyboard Shortcuts

MexBot supports keyboard shortcuts for faster navigation and operation:

### General Shortcuts
- **Ctrl/Cmd + Enter**: Send message (when not typing in input fields)
- **Ctrl/Cmd + N**: Start new chat
- **Ctrl/Cmd + H**: Toggle chat history view
- **Ctrl/Cmd + S**: Open settings page
- **Ctrl/Cmd + T**: Toggle dark/light theme
- **Escape**: Stop current task or go back to chat

### Tips for Better Automation

1. **Be Specific**: Instead of "search for headphones", try "search for wireless Bluetooth headphones under $50"
2. **Use Natural Language**: Write as if you're talking to a human assistant
3. **Break Down Complex Tasks**: Split large tasks into smaller, specific steps
4. **Provide Context**: Include relevant details like price ranges, brands, or specific requirements

## Browser Support

**Officially Supported:**
- **Chrome** - Full support with all features
- **Edge** - Full support with all features

**Not Supported:**
- Firefox, Safari, and other Chromium variants (Opera, Arc, etc.)

**Note**: While MexBot may function on other Chromium-based browsers, we recommend using Chrome or Edge for the best experience and guaranteed compatibility.

## Model Selection

MexBot allows you to configure different LLM models for each agent, balancing performance and cost. Here are recommended configurations:

### Higher Performance
- **Navigator**: GPT-4, Claude-3.5-Sonnet, or Gemini Pro
- **Planner**: GPT-4 or Claude-3.5-Sonnet
- **Validator**: GPT-3.5-Turbo or Claude-3-Haiku

### Cost-Effective
- **Navigator**: GPT-3.5-Turbo or Claude-3-Haiku
- **Planner**: GPT-3.5-Turbo or Claude-3-Haiku
- **Validator**: GPT-3.5-Turbo or Claude-3-Haiku

### Local Models (Ollama)
- **Navigator**: Llama 3.1 8B, Mistral 7B, or CodeLlama 7B
- **Planner**: Llama 3.1 8B or Mistral 7B
- **Validator**: Llama 3.1 8B or Mistral 7B

**Note**: The cost-effective configuration may produce less stable outputs and require more iterations for complex tasks.

**Tip**: Feel free to experiment with your own model configurations! Found a great combination? Share it with the community to help others optimize their setup.

## See It In Action

Here are some powerful tasks you can accomplish with just a sentence:

1. **News Summary**:
   > "Go to TechCrunch and extract top 10 headlines from the last 24 hours"

2. **GitHub Research**:
   > "Look for the trending Python repositories on GitHub with most stars"

3. **Shopping Research**:
   > "Find a portable Bluetooth speaker on Amazon with a water-resistant design, under $50. It should have a minimum battery life of 10 hours"

## Roadmap

We're actively developing MexBot with exciting features on the horizon, welcome to join us! 

Check out our detailed roadmap and upcoming features in our community discussions.

## Support

**We're here to help you get the most out of MexBot!**  We offer various support options:

*  **Documentation & Guides** 
   * Comprehensive documentation and setup guides
   * Best practices for web automation workflows
*  **Technical Support** 
   * Get help with configuration and troubleshooting
   * Expert assistance for complex automation scenarios
* **Enterprise Support**
   * Dedicated support for enterprise deployments
   * Custom integration assistance

We believe in providing exceptional support to ensure your success with MexBot.

## Security

MexBot is built with enterprise-grade security in mind. If you discover a security vulnerability, please **DO NOT** disclose it publicly through issues, pull requests, or discussions.

Instead, please contact our security team directly to report the vulnerability responsibly. This allows us to address the issue before it's publicly disclosed.

We appreciate your help in keeping MexBot and its users secure!

## Community

Join our growing community of developers and users:

- Discord - Chat with team and community
- Twitter - Follow for updates and announcements
- Community Forums - Share ideas and ask questions

## Acknowledgments

MexBot builds on top of other awesome technologies and frameworks:

- Browser Use
- Puppeteer
- Chrome Extension Boilerplate
- LangChain

Huge thanks to their creators and contributors!

## License

This project is proprietary software developed by Patfer Coding Company. All rights reserved.

Made with ❤️ by the MexBot Team. 

**Made by Patfer Coding Company, Patrick Blanks (c) 2025 Patrick Blanks**

Like MexBot? Give us a star 🌟 and join us in Discord | Twitter

## Disclaimer on Derivative Projects

**We explicitly *DO NOT* endorse, support, or participate in any** projects involving cryptocurrencies, tokens, NFTs, or other blockchain-related applications **based on this codebase.**

**Any such derivative projects are NOT Affiliated with, or maintained by, or in any way connected to the official MexBot project or its core team.**

**We assume NO LIABILITY for any losses, damages, or issues arising from the use of third-party derivative projects. Users interact with these projects at their own risk.**

**We reserve the right to publicly distance ourselves from any misuse or misleading use of our name, codebase, or brand.**

We encourage innovation but urge our community to be discerning and cautious. Please ensure you understand the risks before using any software or service built upon our proprietary codebase by independent developers.

