import React, { useState } from "react";
import "./TweetBox.css";
import { Avatar, Button } from "@material-ui/core";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import GifOutlinedIcon from "@material-ui/icons/GifOutlined";
import PollOutlinedIcon from "@material-ui/icons/PollOutlined";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import ScheduleOutlinedIcon from "@material-ui/icons/ScheduleOutlined";
import { projectStorage, projectFirestore, timeStamp } from "./firebase";
import { v4 as uuidv4 } from "uuid";

function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");
  // const [tweetImageUrl, setTweetImageUrl] = useState("");

  const sendTweet = () => {
    const collectionRef = projectFirestore.collection("posts");

    if (tweetImage) {
      const tweetImageNameSplit = tweetImage.name.split(".");
      const type = tweetImage["type"].split("/")[0];
      const storageRef = projectStorage.ref(
        `${type}/${uuidv4()}.${
          tweetImageNameSplit[tweetImageNameSplit.length - 1]
        }`
      );
      storageRef.put(tweetImage).on(
        "state_changed",
        (snap) => {},
        (err) => {
          console.log(err);
        },
        async () => {
          const url = await storageRef.getDownloadURL();
          const createdAt = timeStamp();
          collectionRef.add({
            displayName: "Binay Kumar Sahoo",
            username: "binaykumarsahoo",
            verified: true,
            text: tweetMessage,
            avatar:
              "https://pbs.twimg.com/profile_images/1290592429406470145/gQzCF-y7_400x400.jpg",
            attachmentURL: url,
            createdAt: createdAt,
            attachmentType: type,
          });
          // setTweetImageUrl(url);
        }
      );
    } else if (tweetMessage) {
      const createdAt = timeStamp();
      collectionRef.add({
        displayName: "Binay Kumar Sahoo",
        username: "binaykumarsahoo",
        verified: true,
        text: tweetMessage,
        avatar:
          "https://pbs.twimg.com/profile_images/1290592429406470145/gQzCF-y7_400x400.jpg",
        attachmentURL: "",
        createdAt: createdAt,
        attachmentType: "",
      });
    }

    setTweetMessage("");
    setTweetImage("");
  };

  const changeHandler = (e) => {
    let selected = e.target.files[0];

    if (selected) {
      setTweetImage(selected);
    } else {
      setTweetImage(null);
    }
  };

  return (
    <div className="tweetBox">
      <div className="tweetBox__avatar">
        <Avatar src="https://pbs.twimg.com/profile_images/1290592429406470145/gQzCF-y7_400x400.jpg" />
      </div>
      {/* <input
          type="text"
          placeholder="Optional: Enter image URL"
          className="tweetBox__imageInput"
        /> */}
      <div className="tweetBox__input">
        <input
          onChange={(e) => setTweetMessage(e.target.value)}
          value={tweetMessage}
          type="text"
          placeholder="What's happening?"
        />

        <div className="tweetBox__input__attachment">
          {tweetImage &&
            (tweetImage["type"].split("/")[0] === "image" ? (
              <img src={URL.createObjectURL(tweetImage)} alt="tweetImage"></img>
            ) : (
              <video src={URL.createObjectURL(tweetImage)}></video>
            ))}
        </div>

        <div className="tweetBox__tweetBoxOption">
          <label>
            <input
              type="file"
              accept="image/*, video/*"
              onChange={changeHandler}
            />
            <ImageOutlinedIcon className="tweetBox__tweetBoxOption__icons" />
          </label>

          <GifOutlinedIcon className="tweetBox__tweetBoxOption__icons" />
          <PollOutlinedIcon className="tweetBox__tweetBoxOption__icons" />
          <SentimentSatisfiedOutlinedIcon className="tweetBox__tweetBoxOption__icons" />
          <ScheduleOutlinedIcon className="tweetBox__tweetBoxOption__icons" />

          {/* <TweetBoxOption Icon={ImageOutlinedIcon} type="image" />
          <TweetBoxOption Icon={GifOutlinedIcon} type="gif" />
          <TweetBoxOption Icon={PollOutlinedIcon} type="poll" />
          <TweetBoxOption Icon={SentimentSatisfiedOutlinedIcon} type="emoji" />
          <TweetBoxOption Icon={ScheduleOutlinedIcon} type="schedule" /> */}

          <Button onClick={sendTweet} className="tweetBox__tweetButton">
            Tweet
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TweetBox;
