import moment from "moment";
import { AndProgress } from "./Progress";
import { useSelector } from "react-redux";

import { doc, deleteDoc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { message } from "antd";

const Singledata = ({ data, get_polls }: any) => {
  const currentUser = useSelector((state: any) => state.user);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "polls", id));
      message.success("Poll Deleted");
      get_polls();
    } catch (error) {
      console.error(error);
      message.error("Problem Deleting Poll");
    }
  };

  const handleVotes = async (option: string, id: string) => {
    const userEmail = currentUser?.email;
    const docRef = doc(db, "polls", id);
    const docSnap = await getDoc(docRef);
    const new_polls: any = docSnap.data();

    const all_Votes = [
      ...new_polls.option_1_votes,
      ...new_polls.option_2_votes,
      ...new_polls.option_3_votes,
      ...new_polls.option_4_votes,
    ];

    if (all_Votes.includes(userEmail)) {
      message.error("Already Voted");
    } else {
      const updated_poll: any = data;
      updated_poll[option] = [...data[option], userEmail];

      try {
        await setDoc(doc(db, "polls", id), updated_poll);
        message.success("Voted Successfully");
        get_polls();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const total_votes =
    data.option_1_votes.length +
    data.option_2_votes.length +
    data.option_3_votes.length +
    data.option_4_votes.length;

  return (
    <div className="w-full px-3">
      <div className=" flex flex-col mx-auto mt-8 gap-3 border border-slate-200 shadow-md p-4 rounded-2xl w-full max-w-md">
        <div className="flex justify-between items-center text-xs text-gray-500 mb-2 md:block">
          <p>{moment(data.CreatedAt).fromNow()}</p>
          <p className="md:text-right truncate ">{data.Email}</p>
          <p className="md:text-right hidden md:block md:bg-slate-100 text-slate-600 md:text-xs md:px-2.5 md:py-1 md:rounded-full md:font-medium">
            Total Votes:{total_votes}
          </p>
        </div>
        <h1 className="md:text-2xl font-bold text-xl text-left md:my-4 text-[#0F172A]">
          {data.question}
        </h1>

        <AndProgress
          text={data.option_1}
          percent={Math.round((data.option_1_votes.length / total_votes) * 100)}
          onClick={() => handleVotes("option_1_votes", data.id)}
        />
        <AndProgress
          text={data.option_2}
          percent={Math.round((data.option_2_votes.length / total_votes) * 100)}
          onClick={() => handleVotes("option_2_votes", data.id)}
        />
        <AndProgress
          text={data.option_3}
          percent={Math.round((data.option_3_votes.length / total_votes) * 100)}
          onClick={() => handleVotes("option_3_votes", data.id)}
        />
        <AndProgress
          text={data.option_4}
          percent={Math.round((data.option_4_votes.length / total_votes) * 100)}
          onClick={() => handleVotes("option_4_votes", data.id)}
        />

        <p className="md:text-right text-[13px] md:hidden text-right border-t">
          Total Votes:{total_votes}
        </p>

        {currentUser.email === data.Email ? (
          <div className="flex items-center justify-center">
            <button
              className="border bg-red-500 text-white hover:bg-red-600 transition-all duration-400 md:p-3 p-2 md:w-100 md:rounded md:text-[18px] text-base w-30"
              onClick={() => handleDelete(data.id)}
            >
              Delete
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Singledata;
