import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import CreatePoll from "./CreatePoll";

const socket = io("http://localhost:4000");

const Polls = () => {
  const [polls, setPolls] = useState([]);
  const [hasVoted, setHasVoted] = useState({});
  const [totalVotes, setTotalVotes] = useState({});
  const [showCreatePoll, setShowCreatePoll] = useState(false);

  useEffect(() => {
    fetchPolls();
    loadVotesFromLocalStorage();

    // Listen for vote updates from the server
    socket.on("vote", ({ pollId, optionIndex }) => {
      setPolls((prevPolls) =>
        prevPolls.map((poll) => {
          if (poll.id === pollId) {
            const updatedVotes = poll.votes.map((vote, index) =>
              index === optionIndex ? vote + 1 : vote
            );
            return { ...poll, votes: updatedVotes };
          }
          return poll;
        })
      );

      // Recalculate total votes
      setTotalVotes((prevTotalVotes) => {
        const updatedTotalVotes = { ...prevTotalVotes };
        updatedTotalVotes[pollId] = (updatedTotalVotes[pollId] || 0) + 1;
        return updatedTotalVotes;
      });
    });

    return () => socket.off("vote");
  }, []);

  const fetchPolls = async () => {
    try {
      const response = await axios.get("http://localhost:4000/polls/getPolls");
      setPolls(response.data);

      // Calculate total votes for each poll
      const votes = response.data.reduce((acc, poll) => {
        acc[poll.id] = poll.votes.reduce((a, b) => a + b, 0);
        return acc;
      }, {});
      setTotalVotes(votes);
    } catch (error) {
      console.error("Error fetching polls:", error);
    }
  };

  const loadVotesFromLocalStorage = () => {
    const votes = JSON.parse(localStorage.getItem("votes") || "{}");
    setHasVoted(votes);
  };

  const saveVotesToLocalStorage = (votes) => {
    localStorage.setItem("votes", JSON.stringify(votes));
  };

  const handleVote = async (pollId, optionIndex) => {
    if (hasVoted[pollId]) return; // Prevent voting if already voted

    try {
      await axios.post("http://localhost:4000/polls/vote", {
        pollId,
        optionIndex,
      });
      const newVotes = { ...hasVoted, [pollId]: optionIndex };
      setHasVoted(newVotes);
      saveVotesToLocalStorage(newVotes);
    } catch (error) {
      console.error("Error voting on poll:", error);
    }
  };

  const calculatePercentage = (votes, totalVotes) => {
    if (totalVotes === 0) return 0;
    return ((votes / totalVotes) * 100).toFixed(2);
  };

  return (
    <div className="h-1/2 mb-8 w-[40rem] overflow-auto shadow-xl p-4 bg-gray-100 my-4 rounded-3xl">
      <div className="bg-white shadow-md rounded-lg p-6 mb-2">
        <h2 className="text-xl font-semibold mb-4 text-black">Current Polls</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {polls.map((poll) => {
            const totalVotesForPoll = totalVotes[poll.id] || 0;
            const userVoted = hasVoted[poll.id] !== undefined;

            return (
              <div
                key={poll.id}
                className="bg-white border border-gray-300 rounded-lg shadow-md p-4"
              >
                <h3 className="text-lg font-bold mb-2 text-black">
                  {poll.question}
                </h3>
                {poll.options.map((option, index) => {
                  const votes = poll.votes[index];
                  const percentage = calculatePercentage(
                    votes,
                    totalVotesForPoll
                  );

                  return (
                    <div
                      key={index}
                      className="flex items-center mb-2 justify-between"
                    >
                      <button
                        className={`w-[150px] text-white p-2 rounded text-center break-words ${
                          hasVoted[poll.id] === index
                            ? "bg-blue-500 hover:bg-blue-600"
                            : hasVoted[poll.id] !== undefined
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                        }`}
                        onClick={() => handleVote(poll.id, index)}
                        disabled={hasVoted[poll.id] !== undefined}
                      >
                        {option}
                      </button>
                      {userVoted && (
                        <div className="ml-2 flex flex-col">
                          <span className="text-sm text-gray-600">
                            {percentage}%
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full flex justify-center">
        <button
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-4 mx-auto"
          onClick={() => setShowCreatePoll(true)}
        >
          Create Poll
        </button>
        {showCreatePoll && (
          <CreatePoll
            onClose={() => setShowCreatePoll(false)}
            fetchPolls={fetchPolls}
          />
        )}
      </div>
    </div>
  );
};

export default Polls;
