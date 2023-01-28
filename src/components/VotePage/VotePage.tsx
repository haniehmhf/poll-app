import CreateVote from "../CreateVote";
import "./VotePage.css";
import SubmitVote from "../SubmitVote";
import VoteResult from "../VoteResult";

const VotePage = () => (
  <div className="vote-page">
    <CreateVote />
    <SubmitVote />
    <VoteResult />
  </div>
);

export default VotePage;
