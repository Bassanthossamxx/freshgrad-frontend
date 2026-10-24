/**
 * Demo data so the frontend works before the backend is ready.
 * Toggle with NEXT_PUBLIC_USE_MOCKS in .env.local.
 */
import type { Analysis, ChatReply, Roadmap, Session } from "@/types/api";

export const MOCK_SESSION_ID = "demo";

export const mockSession: Session = { session_id: MOCK_SESSION_ID, status: "ready" };

export const mockAnalysis: Analysis = {
  session_id: MOCK_SESSION_ID,
  selected_role: "backend",
  skills: [
    {
      name: "Python",
      level: "strong",
      evidence: ["CV: Backend at ByteHive (FastAPI)", "Course: Programming 2"],
      source: "cv",
    },
    {
      name: "Databases / SQL",
      level: "strong",
      evidence: ["Course: Database Systems 1 & 2", "Project: SouqTek backend"],
      source: "curriculum",
    },
    { name: "Git", level: "basic", evidence: ["CV: GitHub link"], source: "cv" },
    { name: "Docker", level: "none", evidence: [], source: "cv" },
  ],
  role_matches: [
    { role_id: "backend", title: "Junior Backend Engineer", readiness: 58 },
    { role_id: "qa", title: "QA Engineer", readiness: 72 },
    { role_id: "data_analyst", title: "Data Analyst", readiness: 49 },
  ],
  gaps: [
    {
      skill: "Docker",
      importance: "must_have",
      postings_count: 34,
      postings_total: 50,
      user_level: "none",
    },
    {
      skill: "REST API design",
      importance: "must_have",
      postings_count: 41,
      postings_total: 50,
      user_level: "basic",
    },
    {
      skill: "Cloud (AWS/GCP)",
      importance: "nice_to_have",
      postings_count: 18,
      postings_total: 50,
      user_level: "none",
    },
  ],
};

export const mockRoadmap: Roadmap = {
  session_id: MOCK_SESSION_ID,
  role_id: "backend",
  current_readiness: 58,
  projected_readiness: 85,
  project: {
    title: "Dockerized job-board API",
    description: "FastAPI + PostgreSQL, containerized with Docker Compose and deployed.",
  },
  weeks: [
    {
      week: 1,
      focus: "Docker basics",
      tasks: ["Containerize a FastAPI app", "Write a docker-compose.yml with Postgres"],
      resources: [{ title: "Docker Getting Started", url: "https://docs.docker.com/get-started/" }],
    },
    {
      week: 2,
      focus: "REST API design",
      tasks: ["Pagination, filtering, error formats", "OpenAPI docs"],
      resources: [{ title: "FastAPI Tutorial", url: "https://fastapi.tiangolo.com/tutorial/" }],
    },
  ],
  career_path: [
    { title: "Junior Backend Engineer", years: "0–2" },
    { title: "Backend Engineer", years: "2–4" },
    { title: "Senior / Tech Lead", years: "4+" },
  ],
};

export const mockChatReply: ChatReply = {
  message: {
    role: "assistant",
    content:
      "Got it, you used Docker in a uni project. I moved Docker to basic. Readiness is now 63%.",
  },
  readiness: 63,
};
