import { FC } from "react";
import { useMutation } from "react-query";
import Image from "lib/api/image";
import styled from "styled-components";

const UploadSuccess = styled.span`
  color: green;
  background-color: light-green;
  grid-column: 2 / span 1;
`;

const UploadFailure = styled.span`
  color: red;
  background-color: pink;
  grid-column: 2 / span 1;
`;

const ImageInput = styled.input`
  grid-columns: 1 / span 1;
`;

const ImageUploadContainer = styled.span`
  display: grid;
  gird-template-columns: 1fr 1fr;
`;

const ImageUpload: FC<{
  disabled: boolean;
  setImageUrl: (fn: string) => void;
}> = ({ disabled, setImageUrl }) => {
  const uploadResult = useMutation(
    (image?: string): Promise => {
      return Image.upload({
        image: image,
      });
    }
  );

  function handleRequest({ target }) {
    if (target) {
      uploadResult.mutate(target);
    }
  }

  function imageStatus() {
    if (uploadResult.isIdle) {
      return <div></div>;
    }
    if (uploadResult.isError) {
      return <UploadFailure>Image Upload Error</UploadFailure>;
    } else if (uploadResult.isSuccess) {
      return <UploadSuccess>Image Successfully Uploaded</UploadSuccess>;
    }
  }

  return (
    <>
      <label htmlFor="imageUrl">Image</label>
      <ImageUploadContainer>
        <ImageInput
          name="imageUrl"
          onChange={handleRequest}
          type="file"
          accept="img/*"
          disabled={disabled}
        />
        {imageStatus()}
      </ImageUploadContainer>
    </>
  );
};

export default ImageUpload;
