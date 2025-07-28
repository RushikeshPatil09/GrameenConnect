import { useParams } from "react-router-dom";

export default function ComplaintDetails() {
  const { id } = useParams();

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Complaint ID: {id}</h1>
      {/* You can fetch and show complaint details using this ID */}
    </div>
  );
}
