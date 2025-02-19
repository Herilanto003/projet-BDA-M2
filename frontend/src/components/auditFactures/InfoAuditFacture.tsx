import Modal from "../Modal";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { formatter } from "../../utils/formatDate";

export default function InfoAuditFacture({
  onClose,
  auditFact,
}: {
  onClose: () => void;
  auditFact?: any;
}) {
  console.log(auditFact);

  return (
    <Modal>
      <div className="w-1/3 bg-white p-8 rounded-lg mx-auto mb-8">
        {/* Header */}
        <div className="w-full flex justify-between items-center text-2xl font-semibold">
          <div className="flex justify-start items-center space-x-2 text-indigo-500">
            <BsFillInfoCircleFill />
            <h1>Facture N° {auditFact?.factureNumber}</h1>
          </div>

          <button className="text-red-500" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        {/* End Header */}

        {/* Body */}
        <div className="mt-4">
          <div className="text-justify mb-4">
            <h4 className="font-semibold text-xs text-gray-500">
              Type d'action
            </h4>
            <p className="font-semibold">
              {auditFact?.actionType === "CREATE"
                ? "Ajout"
                : auditFact?.actionType === "UPDATE"
                ? "Mise à jour"
                : "Suppression"}
            </p>
          </div>

          <div className="text-justify mb-4">
            <h4 className="font-semibold text-xs text-gray-500">
              Date de mise à jour
            </h4>
            <p className="font-semibold">
              {auditFact
                ? formatter.format(new Date(auditFact?.dateUpdate))
                : ""}
            </p>
          </div>

          <div className="text-justify mb-4">
            <h4 className="font-semibold text-xs text-gray-500">
              Numéro Facture
            </h4>
            <p className="font-semibold">{auditFact?.factureNumber}</p>
          </div>

          <div className="text-justify mb-4">
            <h4 className="font-semibold text-xs text-gray-500">Nom Facture</h4>
            <p className="font-semibold">{auditFact?.factureName}</p>
          </div>

          <div className="text-justify mb-4">
            <h4 className="font-semibold text-xs text-gray-500">
              Date de Facture
            </h4>
            <p className="font-semibold">
              {auditFact?.factureDate
                ? formatter.format(new Date(auditFact?.factureDate))
                : ""}
            </p>
          </div>

          <div className="text-justify mb-4">
            <h4 className="font-semibold text-xs text-gray-500">
              Ancien Montant
            </h4>
            <p className="font-semibold">{auditFact?.oldAmount}</p>
          </div>

          <div className="text-justify mb-4">
            <h4 className="font-semibold text-xs text-gray-500">
              Nouveau Montant
            </h4>
            <p className="font-semibold">{auditFact?.newAmount}</p>
          </div>

          <div className="text-justify mb-4">
            <h4 className="font-semibold text-xs text-gray-500">
              Adresse email utilisateur
            </h4>
            <p className="font-semibold">{auditFact?.userEmail}</p>
          </div>

          <div className="text-justify mb-4">
            <h4 className="font-semibold text-xs text-gray-500">Pseudo</h4>
            <p className="font-semibold">{auditFact?.userName}</p>
          </div>
        </div>
        {/* End Body */}
      </div>
    </Modal>
  );
}
