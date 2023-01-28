import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Option, Question, Result } from "../types/Vote";

const initQuestion = { title: "", options: [] };

const VoteCTX = createContext<ContextType>({
  question: initQuestion,
  result: {},
  setQuestion: () => {},
  updateOptions: () => {},
  deleteOption: () => {},
  resetVote: () => {},
  setResult: () => {},
});

type ContextType = {
  question: Question;
  result: Result;
  setQuestion: (question: Question) => void;
  updateOptions: (option: Option) => void;
  deleteOption: (id: number) => void;
  resetVote: () => void;
  setResult: (result: Result) => void;
};

const useVoteContext = () => useContext(VoteCTX) as ContextType;

const VoteContext = ({ children }: { children: ReactNode }) => {
  const [question, setQuestion] = useState<Question>(initQuestion);
  const [result, setResult] = useState<Result>({});

  const updateOptions = useCallback(
    (option: Option) => {
      if (!option) return;
      setQuestion((prevQuestion: Question) => {
        const isExist = prevQuestion.options.find((op) => op.id === option.id);
        if (isExist) {
          prevQuestion.options = prevQuestion.options.map((opt: Option) => {
            if (opt.id === option.id) return option;
            return opt;
          });
        } else {
          prevQuestion.options.push(option);
        }
        return prevQuestion;
      });
    },
    [setQuestion]
  );

  const deleteOption = useCallback(
    (id: number) => {
      setQuestion((prevQuestion: Question) => {
        prevQuestion.options = prevQuestion.options.filter(
          (opt: Option) => opt.id === id
        );
        return prevQuestion;
      });
    },
    [setQuestion]
  );

  const resetVote = useCallback(() => {
    setQuestion(initQuestion);
    setResult({});
  }, []);

  const state = useMemo(
    () => ({
      question,
      result,
      setQuestion,
      updateOptions,
      deleteOption,
      resetVote,
      setResult,
    }),
    [
      question,
      result,
      setQuestion,
      updateOptions,
      deleteOption,
      resetVote,
      setResult,
    ]
  );
  return <VoteCTX.Provider value={state}>{children}</VoteCTX.Provider>;
};

export default VoteContext;
