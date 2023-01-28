import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Option, Question, Result } from "../types/Vote";
import { toast } from "react-toastify";

const initQuestion = { title: "", options: [] };
const initResult = {};

const VoteCTX = createContext<ContextType>({
  question: initQuestion,
  result: initResult,
  setQuestionTitle: () => {},
  setQuestion: () => {},
  updateOptions: () => {},
  deleteOption: () => {},
  resetVote: () => {},
  setResult: () => {},
});

type ContextType = {
  question: Question;
  result: Result;
  setQuestionTitle: (title: string) => void;
  setQuestion: (question: Question) => void;
  updateOptions: (option: Option) => void;
  deleteOption: (id: number) => void;
  resetVote: () => void;
  setResult: (result: Result) => void;
};

export const useVoteContext = () => useContext(VoteCTX) as ContextType;

const VoteContext = ({ children }: { children: ReactNode }) => {
  const [question, setQuestion] = useState<Question>(initQuestion);
  const [result, setResult] = useState<Result>({});

  const setQuestionTitle = useCallback(
    (title: string) => {
      setQuestion({ ...question, title: title || initQuestion.title });
    },
    [setQuestion, question]
  );

  const updateOptions = useCallback(
    (option: Option) => {
      if (!option) return;
      setQuestion((prevQuestion: Question) => {
        const isExist = prevQuestion.options.find((op) => op.id === option.id);

        let options = [...prevQuestion.options];
        if (isExist) {
          options = prevQuestion.options.map((opt: Option) => {
            if (opt.id === option.id) return option;
            return opt;
          });
        } else {
          const isRepeated = prevQuestion.options.find(
            (op) => op.value.toLowerCase() === option.value.toLowerCase()
          );
          if (isRepeated) {
            toast.error("You added this option before");
          } else options.push(option);
        }
        return { ...prevQuestion, options };
      });
    },
    [setQuestion]
  );

  const deleteOption = useCallback(
    (id: number) => {
      setQuestion((prevQuestion: Question) => {
        prevQuestion.options = prevQuestion.options.filter(
          (opt: Option) => opt.id !== id
        );
        return { ...prevQuestion };
      });
    },
    [setQuestion]
  );

  const resetVote = useCallback(() => {
    setQuestion(initQuestion);
    setResult(initResult);
  }, [setQuestion, setResult]);

  const state = useMemo(
    () => ({
      question,
      result,
      setQuestionTitle,
      setQuestion,
      updateOptions,
      deleteOption,
      resetVote,
      setResult,
    }),
    [
      question,
      result,
      setQuestionTitle,
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
