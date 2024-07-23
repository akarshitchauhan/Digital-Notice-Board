
const GoogleSlideEmbed = ({ embedUrl }) => {
  return (
    <div className="h-1/2 bg-blue-600 rounded-xl">
      <div className="w-full">
        <iframe
          src={embedUrl}
          className="w-full h-[27rem] border-0 rounded-xl"
          allowFullScreen
          title="Google Slides"
        ></iframe>
      </div>
    </div>
  );
};

export default GoogleSlideEmbed;
