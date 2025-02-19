import EChartsReact from "echarts-for-react";
import { useGetAuditFacturesTotalActionsQuery } from "../../redux/services/auditFactureApi";

export default function NightingaleChart() {
  const {
    data: totals,
    isError,
    isFetching,
    isSuccess,
  } = useGetAuditFacturesTotalActionsQuery();

  console.log(totals);

  const option = {
    color: ["#ff5733", "#33ff57", "#3357ff"],
    legend: {
      top: "bottom",
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: "Nightingale Chart",
        type: "pie",
        radius: [50, 250],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 8,
        },
        label: {
          show: true, // Affiche les labels
          position: "outside", // Position des labels (peut être "inside" ou "outside")
          formatter: "{b}: {c}", // Format du label : nom (b) et valeur (c)
          fontSize: 18,
          fontWeight: "bold",
        },
        // data: [
        //   { value: 40, name: "CREATE" },
        //   { value: 38, name: "UPDATE" },
        //   { value: 32, name: "DELETE" },
        // ],
        data: totals
          ? totals?.map((t: any) => ({
              value: t?.count,
              name:
                t?.actionType === "CREATE"
                  ? "AJOUT"
                  : t?.actionType === "UPDATE"
                  ? "MISE A JOUR"
                  : "SUPPRESSION",
            }))
          : {},
      },
    ],
  };
  return (
    <div className="text-center w-full">
      {isFetching && (
        <p className="text-3xl text-center font-semibold w-full">
          Chargement...
        </p>
      )}

      {isError && (
        <p className="text-3xl text-center font-semibold w-full text-red-500">
          Serveur non accedé
        </p>
      )}

      {isSuccess && (
        <EChartsReact option={option} style={{ height: 700, width: "100%" }} />
      )}
    </div>
  );
}
