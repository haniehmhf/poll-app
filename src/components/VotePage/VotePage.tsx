import CreateVote from "../CreateVote";
import { ToastContainer } from "react-toastify";
import "./VotePage.css";
const VotePage = () => {
  return (
    <div className="page-container">
      <CreateVote></CreateVote>
      <ToastContainer />
    </div>
  );
};

export default VotePage;
