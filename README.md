---

# Epsilon - Educative App

Epsilon is an educational application built with **Next.js** and **Supabase**. It allows managing modules, trainings, submissions, and reviews while offering a modern user interface powered by **Tailwind CSS** and **Radix UI**.

---

## Table of Contents

- Features
- Technologies Used
- Installation
- Configuration
- Available Scripts
- Project Structure
- Key Features
- Local Development
- Deployment
- Contributing
- Support
- License

---

## Features

- **Module Management**: List available modules with the ability to follow them.
- **Reviews**: Manage submissions pending review.
- **Authentication**: Integration with Supabase to manage users and sessions.
- **Modern Interface**: Built with Tailwind CSS and Radix UI for a smooth user experience.
- **Multi-User Support**: Manage roles and user statistics.
- **File Storage**: Upload and manage files via Supabase Storage.

---

## Technologies Used

- **Framework**: [Next.js](https://nextjs.org) (App Router and Pages Router)
- **Database**: [Supabase](https://supabase.com)
- **UI**: [Tailwind CSS](https://tailwindcss.com), [Radix UI](https://www.radix-ui.com)
- **Language**: TypeScript
- **Package Manager**: pnpm
- **Others**:
  - `@supabase/supabase-js` for Supabase interactions
  - `lucide-react` for icons
  - `next-themes` for theme management

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/epsilon.git
   cd epsilon
   ```

2. Install dependencies using pnpm:

   ```bash
   npm install -g pnpm
   pnpm install
   ```

3. Configure environment variables:

   Rename the `.env.example` file to `.env.local` and add your Supabase keys:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://fkinrtthmbjsafzjstpp.supabase.co
      NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZraW5ydHRobWJqc2FmempzdHBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyNTEyNDcsImV4cCI6MjA2MDgyNzI0N30.dEvtK7ccqiSLgqIchfGOvqQVXd7AZPe_EvxHG6zPizE
   ```

---

## Configuration

### Environment Variables

- **NEXT_PUBLIC_SUPABASE_URL**: Your Supabase project URL.
- **NEXT_PUBLIC_SUPABASE_ANON_KEY**: Anonymous API key for accessing Supabase.

These variables are required for the application to function properly.

---

## Available Scripts

Here are the scripts available in the `package.json` file:

- **`pnpm dev`**: Starts the development server.
- **`pnpm build`**: Builds the application for production.
- **`pnpm start`**: Starts the server in production mode.

---

## Project Structure

Here is an overview of the project structure:

```
epsilon/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Main layout
│   ├── private/
│   │   ├── components/      # Application-specific components
│   │   ├── modules/         # Module management
│   │   ├── reviews/         # Review management
│   │   └── trainings/       # Training management
├── utils/
│   ├── supabase/            # Supabase configuration
│   ├── utils.ts             # Utility functions
├── public/                  # Public files (favicon, images, etc.)
├── tailwind.config.ts       # Tailwind CSS configuration
├── package.json             # Dependencies and scripts
└── README.md                # Project documentation
```

---

## Key Features

### 1. Module Management

- Displays a list of available modules.
- Allows users to follow modules.
- Example component: `ModulesPage`.

### 2. Reviews

- Displays submissions pending review.
- Allows users to view submission details.
- Example component: `ReviewsPage`.

### 3. Authentication

- Uses Supabase to manage users and sessions.
- Redirects unauthenticated users to the login page.

### 4. File Upload

- Allows users to upload files via Supabase Storage.
- Example component: `SubmitForm`.

---

## Local Development

1. Start the development server:

   ```bash
   pnpm dev
   ```

2. Open your browser at the following address:

   ```
   http://localhost:3000
   ```

3. Log in with a valid user to access private features.

---

## Deployment

### Deploying to Vercel

1. Connect your project to [Vercel](https://vercel.com).
2. Add the environment variables in the Vercel project settings.
3. Deploy the application.

---

## Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a branch for your feature or bug fix.
3. Make your changes and submit a pull request.

---

## Support

If you have any questions or issues, open an issue on the [GitHub repository](https://github.com/your-username/epsilon/issues).

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.

---

