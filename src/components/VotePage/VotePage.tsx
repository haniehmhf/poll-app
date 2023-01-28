import CreateVote from "../CreateVote";
import { ToastContainer } from "react-toastify";
import "./VotePage.css";
import SubmitVote from "../SubmitVote";
const VotePage = () => {
  return (
    <div className="page-container">
      <CreateVote />
      <SubmitVote />
      <ToastContainer />
    </div>
  );
};

export default VotePage;
