import api from "./api";

export async function getDashboardSummary() {
  const response = await api.get("/DailyEntry");
  return response.data;
}

export async function saveDailyCheckIn(payload) {
  const response = await api.post("/Dashboard/check-in", payload);
  return response.data;
}

export async function saveDailyEntry(payload) {
  const response = await api.post("/DailyEntry", payload);
  return response.data;
}
