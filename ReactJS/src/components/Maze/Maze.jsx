/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import "./Maze.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const imgURL =
    "https://cdn.vox-cdn.com/thumbor/VlPF8UuUKoUHFtiebdDsQpW1zYs=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/9632107/mario.jpg";

const diamondImgUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG8pGYklUvTbRWYMBZzI1LGkuDphwrOezccr9jhHOCag&s";

const stoneImgUrl =
    "https://img.pikbest.com/png-images/qiantu/hand-drawn-cartoon-stone-elements_2524589.png!sw800";

const marioPosition = { row: null, col: null };
const diamondPosition = { row: null, col: null };
const maze = [
    ["", "", "", "", "diamond", ""],
    ["", "", "", "stone", "stone", "stone"],
    ["", "", "", "", "", ""],
    ["stone", "stone", "stone", "stone", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "stone", "stone", "stone", "stone"],
    ["", "", "", "", "", ""],
    ["", "", "", "mario", "", ""],
];

export const Maze = () => {
    const [mazeInput, setMazeInput] = useState("");
    const [mazeState, setMazeState] = useState(
        JSON.parse(JSON.stringify(maze))
    );

    useEffect(() => {
        // Lấy vị trí ban đầu của mario và diamond trong map
        mazeState.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (cell === "mario") {
                    marioPosition.row = rowIndex;
                    marioPosition.col = colIndex;
                } else if (cell === "diamond") {
                    diamondPosition.row = rowIndex;
                    diamondPosition.col = colIndex;
                }
            });
        });
    }, []);

    const notifiError = (move) => {
        toast.error(`Bạn đã đâm vào cục đá bên ${move}`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    const renderBoard = () => {
        return (
            <div className="board">
                {mazeState.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((cell, colIndex) => (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                className="boxes"
                            >
                                {cell === "diamond" && (
                                    <img
                                        srcSet={`${diamondImgUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                        src={`${diamondImgUrl}?w=164&h=164&fit=crop&auto=format`}
                                        alt={`title`}
                                        loading="lazy"
                                    />
                                )}
                                {cell === "stone" && (
                                    <img
                                        srcSet={`${stoneImgUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                        src={`${stoneImgUrl}?w=164&h=164&fit=crop&auto=format`}
                                        alt={`title`}
                                        loading="lazy"
                                    />
                                )}
                                {cell === "mario" && (
                                    <img
                                        srcSet={`${imgURL}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                        src={`${imgURL}?w=164&h=164&fit=crop&auto=format`}
                                        alt={`title`}
                                        loading="lazy"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleControl(event);
        setMazeInput("");
    };

    const showAnswer = () => {
        setMazeInput(`l\nl\nu\nu\nu\nr\nr\nr\nu\nu\nl\nl\nu\nu\nr\nr`);
    };

    const handleControl = async (event) => {
        const moves = event.target.mazeData.value.split("\n");

        for (let i = 0; i < moves.length; i++) {
            const updatedMazeState = [...mazeState];
            updatedMazeState[marioPosition.row][marioPosition.col] = "";

            switch (moves[i]) {
                case "l":
                    if (
                        marioPosition.col > 0 &&
                        updatedMazeState[marioPosition.row][
                            marioPosition.col - 1
                        ] !== "stone"
                    ) {
                        marioPosition.col -= 1;
                    } else {
                        notifiError("trái");
                    }
                    break;
                case "r":
                    if (
                        marioPosition.col < updatedMazeState[0].length - 1 &&
                        updatedMazeState[marioPosition.row][
                            marioPosition.col + 1
                        ] !== "stone"
                    ) {
                        marioPosition.col += 1;
                    } else {
                        notifiError("phải");
                    }
                    break;
                case "u":
                    if (
                        marioPosition.row > 0 &&
                        updatedMazeState[marioPosition.row - 1][
                            marioPosition.col
                        ] !== "stone"
                    ) {
                        marioPosition.row -= 1;
                    } else {
                        notifiError("trên");
                    }
                    break;
                case "d":
                    if (
                        marioPosition.row < updatedMazeState.length - 1 &&
                        updatedMazeState[marioPosition.row + 1][
                            marioPosition.col
                        ] !== "stone"
                    ) {
                        marioPosition.row += 1;
                    } else {
                        notifiError("dưới");
                    }
                    break;
                default:
                    break;
            }

            updatedMazeState[marioPosition.row][marioPosition.col] = "mario";
            setMazeState([...updatedMazeState]);

            if (
                marioPosition.row === diamondPosition.row &&
                marioPosition.col === diamondPosition.col
            ) {
                Swal.fire({
                    title: "Winner winner chicken dinner",
                    text: "Mario đã tìm thấy kim cương",
                    // icon: "success",
                    confirmButtonText: "OK",
                });
                return;
            }

            await new Promise((resolve) => setTimeout(resolve, 500));
        }
    };

    const handlePlayAgain = () => {
        // Tạo một bản sao của maze để cập nhật trạng thái
        const newMazeState = [...maze];
        // Cập nhật mazeState
        setMazeState(JSON.parse(JSON.stringify(maze)));
        maze.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (cell === "mario") {
                    marioPosition.row = rowIndex;
                    marioPosition.col = colIndex;
                } else if (cell === "diamond") {
                    diamondPosition.row = rowIndex;
                    diamondPosition.col = colIndex;
                }
            });
        });
        console.log("Play Again");
        console.log(mazeState);
        console.log(newMazeState);
        console.log(marioPosition);
    };

    return (
        <div className="maze">
            <h1>Mê cung</h1>
            <div className="container">
                {renderBoard()}
                <form className="form" onSubmit={handleSubmit}>
                    <textarea
                        name="mazeData"
                        placeholder="Nhập l,r,u,d để di chuyển"
                        rows={10}
                        cols={50}
                        value={mazeInput}
                        onChange={(e) => setMazeInput(e.target.value)}
                        required
                    />
                    <div className="btn-group">
                        <button className="btn" type="submit">
                            Run
                        </button>
                        <button
                            className="btn"
                            type="button"
                            onClick={showAnswer}
                        >
                            Get Key
                        </button>
                        <button
                            className="btn"
                            type="button"
                            onClick={handlePlayAgain}
                        >
                            Reset
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};
