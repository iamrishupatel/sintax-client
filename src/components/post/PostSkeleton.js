import React from "react";
import { Skeleton } from "antd";

const PostSkeleton = () => {
  return (
    <div className="post-skeleton">
      <div className="d-flex">
        <Skeleton.Avatar className="avatar" active={true} size={"large"} />
        <div className="name">
          <Skeleton.Input
            active={true}
            size="small"
            style={{ width: 200, height: "1.2rem" }}
          />
          <Skeleton.Input
            active={true}
            size="small"
            style={{ width: 120, height: "0.9rem" }}
          />
        </div>
      </div>
      <div className="body">
        <Skeleton.Input
          active={true}
          size="small"
          style={{
            width: "100%",
            height: "1.2rem",
          }}
        />
        <Skeleton.Input
          active={true}
          size="small"
          style={{ width: "100%", height: "1.2rem" }}
        />
      </div>

      <div className="image">
        <Skeleton.Image />
      </div>
    </div>
  );
};

export default PostSkeleton;
