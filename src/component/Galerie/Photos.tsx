import React, { useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { Empty, Tag } from "antd";
import { useMediaQuery } from "react-responsive";
import _ from "lodash";

export const Photos = ({ photos }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1000px)" });
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  return _.isEmpty(photos) ? (
    <Empty />
  ) : (
    <div>
      <Gallery
        photos={photos}
        onClick={openLightbox}
        columns={isMobile ? 1 : isTablet ? 2 : 4}
        direction="column"
      />
      <ModalGateway>
        {viewerIsOpen && (
          <Modal onClose={closeLightbox}>
            <Carousel
              components={{
                FooterCount: ({ currentIndex }) => (
                  <Tag color="#1DA57A">
                    {currentIndex + 1} / {photos.length}
                  </Tag>
                ),
              }}
              currentIndex={currentImage}
              views={photos.map((x) => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title,
              }))}
            />
          </Modal>
        )}
      </ModalGateway>
    </div>
  );
};
