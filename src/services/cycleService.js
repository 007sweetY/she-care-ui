import api from "./api";

const CYCLE_BASE = "/Cycle";

export const saveCycleDays = async (payload) => {
  const response = await api.post(`${CYCLE_BASE}/save-cycle-days`, payload);
  return response.data;
};

export const predictNextPeriod = async () => {
  const response = await api.get(`${CYCLE_BASE}/predict-next-period`);
  return response.data;
};

export const predictOvulationWindow = async () => {
  const response = await api.get(`${CYCLE_BASE}/predict-ovulation-window`);
  return response.data;
};

export const updateConceptionMode = async (mode) => {
  const response = await api.post(`${CYCLE_BASE}/conception-mode`, { mode });
  return response.data;
};

export const getFertileWindow = async () => {
  const response = await api.get(`${CYCLE_BASE}/fertile-window`);
  return response.data;
};

export const getLatePeriodStatus = async () => {
  const response = await api.get(`${CYCLE_BASE}/late-period`);
  return response.data;
};

export const getIrregularCycleStatus = async () => {
  const response = await api.get(`${CYCLE_BASE}/irregular`);
  return response.data;
};

export const getRiskAnalysis = async () => {
  const response = await api.get(`${CYCLE_BASE}/risk-analysis`);
  return response.data;
};

export const getPregnancyChance = async () => {
  const response = await api.get(`${CYCLE_BASE}/pregnancy-chance`);
  return response.data;
};

export const getCycleNotifications = async () => {
  const response = await api.get(`${CYCLE_BASE}/notifications`);
  return response.data;
};
