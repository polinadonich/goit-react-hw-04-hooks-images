import { useEffect, useState } from "react";
import s from "./App.module.css";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import Loader from "./components/Loader";
import Modal from "./components/Modal";
import fetchImages from "./fetchImages";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [imagePage, setImagePage] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [bigImageUrl, setBigImageUrl] = useState("");

  const toggleModal = (bigImageUrl) => {
    setShowModal(!showModal);
    setBigImageUrl(bigImageUrl);
  };

  const formSubmitHandler = (value) => {
    setImagePage([]);
    setPage(1);
    setSearchQuery(value);
  };

  const handleClickMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const fetchImagePages = async (searchQuery, page) => {
      if (!searchQuery) {
        return;
      }
      setLoading(true);

      const { hits, total } = await fetchImages(searchQuery, page);
      const images = hits.map(({ id, webformatURL, largeImageURL }) => {
        return { id, webformatURL, largeImageURL };
      });
      setImagePage((prevImagePage) => [...prevImagePage, ...images]);
      setTotal(total);
      setLoading(false);

      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    };

    fetchImagePages(searchQuery, page);
  }, [searchQuery, page]);

  return (
    <div className={s.App}>
      <Searchbar onSubmit={formSubmitHandler} />

      <ImageGallery
        searchQuery={searchQuery}
        imagePage={imagePage}
        onOpenModal={toggleModal}
      />

      {loading && <Loader />}
      {total > 0 && <Button onClick={handleClickMoreImages} />}
      {!loading && total === 0 && (
        <p className={s.notificationText}>
          Sorry, we do not have any images for your request
        </p>
      )}
      {showModal && <Modal onClose={toggleModal} bigImageUrl={bigImageUrl} />}
    </div>
  );
}

export default App;
