import { FC } from "react";
import { useMutation } from "react-query";
import Image from "/lib/api/image";

const ImageUpload: FC<{}> = ({ disabled, setImageUrl }) => {
  const uploadResult = useMutation((image) => {
    return Image.upload({
      image: image,
    });
  });

  function handleRequest({ target }) {
    uploadResult.mutate(target.value);
  }

  return (
    <>
      <label htmlFor="imageUrl">Image</label>
      <input
        name="imageUrl"
        onChange={handleRequest}
        type="file"
        accept="img/*"
        disabled={disabled}
      />
    </>
  );
};

export default ImageUpload;
