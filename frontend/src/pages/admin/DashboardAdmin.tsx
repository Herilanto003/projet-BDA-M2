import NightingaleChart from "../../components/auditFactures/NightingaleChart";
import ListAuditFactures from "../../components/auditFactures/ListAuditFactures";
import InfoAuditFacture from "../../components/auditFactures/InfoAuditFacture";
import { useState } from "react";

export default function DashboardAdmin() {
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);

  const [auditFactSelected, setAuditFactSelected] = useState<any>();

  const handleShowAuditFact = (auditFact: any) => {
    setAuditFactSelected(auditFact);
    setIsInfoOpen(true);
  };

  return (
    <>
      {isInfoOpen && (
        <InfoAuditFacture
          auditFact={auditFactSelected}
          onClose={() => setIsInfoOpen(false)}
        />
      )}
      <div className="w-3/5 mx-auto -mt-10">
        <div className="w-full h-[800px] flex justify-center items-center">
          <NightingaleChart />
        </div>

        <ListAuditFactures setIsInfoOpen={handleShowAuditFact} />
      </div>
    </>
  );
}
