import Link from 'next/link'
import Layout from '../components/Layout'
import { GetServerSideProps, NextPage } from 'next';
import { useState } from "react"
import styles from "./index.module.css";
type Props = {
  FirstImageUrl: string;
}
const IndexPage: NextPage<Props> = ({ FirstImageUrl })=> {
  const [imageUrl, setImageUrl] = useState(FirstImageUrl);
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   getImage().then((newImage) => {
  //     setImageUrl(newImage.url);
  //     setLoading(false);
  //   });
  // }, []);
  const hClick = async() => {
    setLoading(true);
    const newImage = await getImage();
    setImageUrl(newImage.url)
    setLoading(false);
  };
  return (
    <div className = {styles.page}>
      <button onClick = {hClick} className = {styles.button}> another cat </button>
      <div className = {styles.frame}>
        {loading || <img src = {imageUrl} className = {styles.img}/>}</div>
    </div>
  )
};

type Image = {
  url: string;
};

export default IndexPage;
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const image = await getImage()
  return {
    props : {
      FirstImageUrl: image.url
    }
  }
}
const getImage = async (): Promise<Image>  => {
  const res = await fetch('https://api.thecatapi.com/v1/images/search');
  const images = await res.json();
  console.log(images)
  return images[0];
}
// getImage();
// getImage().then((image) => {
//   console.log(image.alt);
// });

