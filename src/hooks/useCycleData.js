import { useCallback, useEffect, useState } from "react";
import {
  getCycleNotifications,
  getFertileWindow,
  getIrregularCycleStatus,
  getLatePeriodStatus,
  getPregnancyChance,
  getRiskAnalysis,
  predictNextPeriod,
  predictOvulationWindow,
} from "../services/cycleService";

const EMPTY_STATE = {
  nextPeriod: null,
  ovulationWindow: null,
  fertileWindow: null,
  latePeriod: null,
  irregular: null,
  riskAnalysis: null,
  pregnancyChance: null,
  notifications: [],
};

export const useCycleData = () => {
  const [cycleData, setCycleData] = useState(EMPTY_STATE);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const refreshCycleData = useCallback(async () => {
    setLoading(true);
    setHasError(false);

    const results = await Promise.allSettled([
      predictNextPeriod(),
      predictOvulationWindow(),
      getFertileWindow(),
      getLatePeriodStatus(),
      getIrregularCycleStatus(),
      getRiskAnalysis(),
      getPregnancyChance(),
      getCycleNotifications(),
    ]);

    const anyRejected = results.some((result) => result.status === "rejected");
    setHasError(anyRejected);

    setCycleData({
      nextPeriod: results[0].status === "fulfilled" ? results[0].value : null,
      ovulationWindow: results[1].status === "fulfilled" ? results[1].value : null,
      fertileWindow: results[2].status === "fulfilled" ? results[2].value : null,
      latePeriod: results[3].status === "fulfilled" ? results[3].value : null,
      irregular: results[4].status === "fulfilled" ? results[4].value : null,
      riskAnalysis: results[5].status === "fulfilled" ? results[5].value : null,
      pregnancyChance: results[6].status === "fulfilled" ? results[6].value : null,
      notifications: results[7].status === "fulfilled" ? results[7].value ?? [] : [],
    });

    setLoading(false);
  }, []);

  useEffect(() => {
    refreshCycleData();
  }, [refreshCycleData]);

  return {
    ...cycleData,
    loading,
    hasError,
    refreshCycleData,
  };
};
