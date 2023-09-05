import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const options: NextAuthOptions = {
	providers: [
		// GitHubProvider({
		// 	clientId: process.env.GITHUB_ID as string,
		// 	clientSecret: process.env.GITHUB_SECRET as string,
		// }),
		GoogleProvider({
			clientId: process.env.AUTH_GOOGLE_CLIENT_ID ?? "",
			clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET ?? "",
		}),
	],
};
