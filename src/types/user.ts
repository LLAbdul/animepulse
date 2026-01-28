// User types

export interface User {
  id: string;
  email: string;
  username: string;
  name?: string;
  avatarUrl?: string;
  isPublic: boolean;
  language: "en" | "fr";
  createdAt: Date;
}

export interface UserStats {
  totalAnimes: number;
  watching: number;
  completed: number;
  planToWatch: number;
  onHold: number;
  dropped: number;
  averageRating?: number;
  estimatedHoursWatched?: number;
}

export interface PublicProfile {
  username: string;
  avatarUrl?: string;
  createdAt: Date;
  stats: UserStats;
}
