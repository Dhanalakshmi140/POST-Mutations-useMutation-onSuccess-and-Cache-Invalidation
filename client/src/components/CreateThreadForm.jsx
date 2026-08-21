import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createThread } from "../services/threads.service";

function CreateThreadForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createThread,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["threads"],
      });

      setTitle("");
      setBody("");
    },
  });

function handleSubmit(e) {
  e.preventDefault();
  mutation.mutate({ title, body });
}

  return (
    <form onSubmit={handleSubmit}>
      {/* Keep the starter's existing title input */}

      {/* Keep the starter's existing body input */}

      {mutation.isError && (
        <p role="alert">
          Failed to create thread. Please try again.
        </p>
      )}

      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Posting…" : "Post thread"}
      </button>
      {mutation.isError && (
  <p className="err">{mutation.error.message}</p>
)}
    </form>
  );
}

export default CreateThreadForm;