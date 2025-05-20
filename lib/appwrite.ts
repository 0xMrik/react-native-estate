import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";
import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite";

export const config = {
  platform: "com.jsm.restate",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
};

// Vérification des valeurs de configuration
console.log("Configuration Appwrite:", {
  endpoint: config.endpoint,
  projectId: config.projectId,
  platform: config.platform
});

export const client = new Client();

// Vérification de l'initialisation du client
try {
  client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.platform!);
  
  console.log("Client Appwrite initialisé avec succès");
} catch (error) {
  console.error("Erreur lors de l'initialisation du client Appwrite:", error);
}

export const avatar = new Avatars(client);
export const account = new Account(client);

export async function login() {
  try {
    const redirectUri = Linking.createURL("/");
    console.log("URI de redirection:", redirectUri);

    console.log("Tentative de création de session OAuth2 avec Google");
    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );

    console.log("Réponse OAuth2:", response);

    if (!response) {
        throw new Error('Failed to create OAuth2 session')
    }
    
    const browserResult = await openAuthSessionAsync(response.toString(), redirectUri)

    if (browserResult.type !== "success") {
      throw new Error("Failed to open browser");
    }

    const url = new URL(browserResult.url);
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();

    if (!secret || !userId) {
      throw new Error("Failed to get secret or userId");
    }

    const session = await account.createSession(userId, secret);

    if (!session) {
      throw new Error("Failed to create session");
    }
    
    

    return true;
  } catch (error) {
    console.log("Erreur lors de la connexion:", error);
    return false;
  }
}

export async function logout() {
  try {
    await account.deleteSession("current");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getCurrentUser() {
    try {
        console.log("Tentative de récupération de l'utilisateur courant");
        const response = await account.get();
        console.log("Utilisateur récupéré:", response);
        if(response.$id) {
            const userAvatar = avatar.getInitials(response.name);
            return {
                ...response,
                avatar: userAvatar.toString(),
            }
        }
        
    } catch (error) {
        console.log("Erreur lors de la récupération de l'utilisateur:", error);
        return null;
    }
}
