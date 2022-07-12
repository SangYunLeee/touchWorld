import db from "../model";
const Post = db.post;
const Comment = db.comment;

// Create Comment
export const create = async (req: any, res: any) => {
  const {text, postId} = req.body;
  console.log("req.body: ", req.body);

  const author = req.userId;
  // Validate request
  if (!text || !postId) {
    res.status(400).send({ message: "there is no comment or post" });
    return;
  }

  const post = await Post.findOne({_id: postId})
    .catch(err => {
      console.log("create comment failed, there is no matched post");
      res.status(400).send({ message: "there is no post" });
      return;
    })

  if (!post) {
    return;
  }

  // Create a comment
  const comment = new Comment({
    author,
    post: post._id,
    text
  });

  // Save comment in the database
  comment
    .save(comment)
    .then((savedComment) => {
      Post.findByIdAndUpdate(post._id, { $push: { comments: comment} }, { useFindAndModify: false })
        .then(savedPost => {
          res.send(savedComment.toJSON());
        })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the comment.",
      });
    });
};
