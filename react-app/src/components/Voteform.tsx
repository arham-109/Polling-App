import { useEffect, useState } from "react";
import { AndInput } from "./Input";
import { message } from "antd";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { useSelector } from "react-redux";
import Singledata from "./Singledata";

const Voteform = () => {
  const currentUser = useSelector((state: any) => state.user);

  const [question, set_question] = useState("");

  const [option_1, set_option1] = useState("");
  const [option_2, set_option2] = useState("");
  const [option_3, set_option3] = useState("");
  const [option_4, set_option4] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!question) {
      message.error("Enter Question");
      return;
    }
    if (!option_1) {
      message.error("Option 1 is required");
      return;
    }
    if (!option_2) {
      message.error("Option 2 is required");
      return;
    }
    if (!option_3) {
      message.error("Option 3 is required");
      return;
    }
    if (!option_4) {
      message.error("Option 4 is required");
      return;
    }

    try {
      await addDoc(collection(db, "polls"), {
        question: question,
        option_1: option_1,
        option_2: option_2,
        option_3: option_3,
        option_4: option_4,
        Email: currentUser.email,
        CreatedAt: new Date().getTime(),
        option_1_votes: [],
        option_2_votes: [],
        option_3_votes: [],
        option_4_votes: [],
      });
      message.success("Poll Created Successfully");

      set_question("");
      set_option1("");
      set_option2("");
      set_option3("");
      set_option4("");
      get_polls();
    } catch (error) {
      console.error(error);
      message.error("Problem Creating Poll");
    }
  };

  useEffect(() => {
    get_polls();
  }, []);

  const [polls, set_polls] = useState([]);

  const get_polls = async () => {
    const querySnapshot = await getDocs(collection(db, "polls"));

    const all_posts: any = [];

    querySnapshot.forEach((doc) => {
      all_posts.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    set_polls(all_posts);
  };

  return (
    <div className="bg-slate-50">
      <form
        className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-md border border-slate-100  "
        onSubmit={handleSubmit}
      >
        <AndInput
          placeholder="Enter Your Question"
          className="p-3! col-span-2!  bg-slate-50! border! border-slate-200! focus:border-indigo-500! focus:ring-2! focus:ring-indigo-100!"
          value={question}
          onChange={(e: any) => set_question(e.target.value)}
        />
        <AndInput
          placeholder="Enter Option 1"
          className="p-3!  bg-slate-50! border! border-slate-200! focus:border-indigo-500! focus:ring-2! focus:ring-indigo-100!"
          value={option_1}
          onChange={(e: any) => set_option1(e.target.value)}
        />
        <AndInput
          placeholder="Enter Option 2"
          className="p-3!  bg-slate-50! border! border-slate-200! focus:border-indigo-500! focus:ring-2! focus:ring-indigo-100!"
          value={option_2}
          onChange={(e: any) => set_option2(e.target.value)}
        />
        <AndInput
          placeholder="Enter Option 3"
          className="p-3!  bg-slate-50! border! border-slate-200! focus:border-indigo-500! focus:ring-2! focus:ring-indigo-100!"
          value={option_3}
          onChange={(e: any) => set_option3(e.target.value)}
        />
        <AndInput
          placeholder="Enter Option 4"
          className="p-3!  bg-slate-50! border! border-slate-200! focus:border-indigo-500! focus:ring-2! focus:ring-indigo-100!"
          value={option_4}
          onChange={(e: any) => set_option4(e.target.value)}
        />
        <div></div>
        <div className="flex justify-center items-center md:justify-end">
          <button
            onClick={handleSubmit}
            className="bg-[#6366F1] hover:bg-[#4F46E5] transition-all duration-400 text-white md:p-3 p-2 md:w-100 w-50 md:text-[18px] md:mt-[2%] mt-[3%] rounded-xl"
          >
            Create Poll
          </button>
        </div>
      </form>

      {polls.map((singleData: any, index: number) => {
        return (
          <Singledata key={index} data={singleData} get_polls={get_polls} />
        );
      })}
    </div>
  );
};

export default Voteform;
