# MexBot

MexBot is an open-source AI web automation tool that runs in your browser. A free alternative to OpenAI Operator with flexible LLM options and multi-agent system.

**Made by Patfer Coding Company, Patrick Blanks (c) 2025 Patrick Blanks**

## Why MexBot?

Looking for a powerful AI web agent without the $200/month price tag of OpenAI Operator? **MexBot**, as a chrome extension, delivers premium web automation capabilities while keeping you in complete control:

- **100% Free** - No subscription fees or hidden costs. Just install and use your own API keys, and you only pay what you use with your own API keys.
- **Privacy-Focused** - Everything runs in your local browser. Your credentials stay with you, never shared with any cloud service.
- **Flexible LLM Options** - Connect to your preferred LLM providers with the freedom to choose different models for different agents.
- **Fully Open Source** - Complete transparency in how your browser is automated. No black boxes or hidden processes.

**Note:** We currently support OpenAI, Anthropic, Gemini, Ollama, Groq, Cerebras, Llama and custom OpenAI-Compatible providers, more providers will be supported.

## Key Features

- **Multi-agent System**: Specialized AI agents collaborate to accomplish complex web workflows
- **Interactive Side Panel**: Intuitive chat interface with real-time status updates
- **Task Automation**: Seamlessly automate repetitive web automation tasks across websites
- **Follow-up Questions**: Ask contextual follow-up questions about completed tasks
- **Conversation History**: Easily access and manage your AI agent interaction history
- **Multiple LLM Support**: Connect your preferred LLM providers and assign different models to different agents

## Browser Support

**Officially Supported:**
- **Chrome** - Full support with all features
- **Edge** - Full support with all features

**Not Supported:**
- Firefox, Safari, and other Chromium variants (Opera, Arc, etc.)

**Note**: While MexBot may function on other Chromium-based browsers, we recommend using Chrome or Edge for the best experience and guaranteed compatibility.

## Quick Start

1. **Install from Chrome Web Store** (Stable Version):
   * Visit the MexBot Chrome Web Store page
   * Click "Add to Chrome" button
   * Confirm the installation when prompted

**Important Note**: For latest features, install from "Manually Install Latest Version" below, as Chrome Web Store version may be delayed due to review process.

2. **Configure Agent Models**:
   * Click the MexBot icon in your toolbar to open the sidebar
   * Click the `Settings` icon (top right)
   * Add your LLM API keys
   * Choose which model to use for different agents (Navigator, Planner, Validator)

## Manually Install Latest Version

To get the most recent version with all the latest features:

1. **Download**
    * Download the latest `mexbot.zip` file from the official Github release page.

2. **Install**:
    * Unzip `mexbot.zip`.
    * Open `chrome://extensions/` in Chrome
    * Enable `Developer mode` (top right)
    * Click `Load unpacked` (top left)
    * Select the unzipped `mexbot` folder.

3. **Configure Agent Models**
    * Click the MexBot icon in your toolbar to open the sidebar
    * Click the `Settings` icon (top right).
    * Add your LLM API keys.
    * Choose which model to use for different agents (Navigator, Planner, Validator)

4. **Upgrading**:
    * Download the latest `mexbot.zip` file from the release page.
    * Unzip and replace your existing MexBot files with the new ones.
    * Go to `chrome://extensions/` in Chrome and click the refresh icon on the MexBot card.

## Build from Source

If you prefer to build MexBot yourself, follow these steps:

1. **Prerequisites**:
   * [Node.js](https://nodejs.org/) (v22.12.0 or higher)
   * [pnpm](https://pnpm.io/installation) (v9.15.1 or higher)

2. **Clone the Repository**:
   ```bash
   git clone https://github.com/pacmex_admin/MexBot.git
   cd MexBot
   ```

3. **Install Dependencies**:
   ```bash
   pnpm install
   ```

4. **Build the Extension**:
   ```bash
   pnpm build
   ```

5. **Load the Extension**:
   * Open `chrome://extensions/` in Chrome
   * Enable `Developer mode` (top right)
   * Click `Load unpacked` (top left)
   * Select the `dist` folder from the project root

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

Check out our detailed roadmap and upcoming features in our GitHub Discussions.

## Contributing

**We need your help to make MexBot even better!**  Contributions of all kinds are welcome:

*  **Share Prompts & Use Cases** 
   * Join our Discord server.
   * share how you're using MexBot.  Help us build a library of useful prompts and real-world use cases.
*  **Provide Feedback** 
   * Try MexBot and give us feedback on its performance or suggest improvements in our Discord server.
* **Contribute Code**
   * Check out our CONTRIBUTING.md for guidelines on how to contribute code to the project.
   * Submit pull requests for bug fixes, features, or documentation improvements.

We believe in the power of open source and community collaboration.  Join us in building the future of web automation!

## Security

If you discover a security vulnerability, please **DO NOT** disclose it publicly through issues, pull requests, or discussions.

Instead, please create a GitHub Security Advisory to report the vulnerability responsibly. This allows us to address the issue before it's publicly disclosed.

We appreciate your help in keeping MexBot and its users safe!

## Community

Join our growing community of developers and users:

- Discord - Chat with team and community
- Twitter - Follow for updates and announcements
- GitHub Discussions - Share ideas and ask questions

## Acknowledgments

MexBot builds on top of other awesome open-source projects:

- Browser Use
- Puppeteer
- Chrome Extension Boilerplate
- LangChain

Huge thanks to their creators and contributors!

## License

This project is licensed under the Apache License 2.0 - see the LICENSE file for details.

Made with ❤️ by the MexBot Team. 

**Made by Patfer Coding Company, Patrick Blanks (c) 2025 Patrick Blanks**

Like MexBot? Give us a star 🌟 and join us in Discord | Twitter

## Disclaimer on Derivative Projects

**We explicitly *DO NOT* endorse, support, or participate in any** projects involving cryptocurrencies, tokens, NFTs, or other blockchain-related applications **based on this codebase.**

**Any such derivative projects are NOT Affiliated with, or maintained by, or in any way connected to the official MexBot project or its core team.**

**We assume NO LIABILITY for any losses, damages, or issues arising from the use of third-party derivative projects. Users interact with these projects at their own risk.**

**We reserve the right to publicly distance ourselves from any misuse or misleading use of our name, codebase, or brand.**

We encourage open-source innovation but urge our community to be discerning and cautious. Please ensure you understand the risks before using any software or service built upon our codebase by independent developers.


