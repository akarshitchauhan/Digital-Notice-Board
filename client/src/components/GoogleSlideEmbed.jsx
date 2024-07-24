
const GoogleSlideEmbed = ({ embedUrl }) => {
  return (
    <div className="h-1/2 bg-blue-600 rounded-xl">
      <div className="w-full">
        <iframe
          src={embedUrl}
          className="w-full h-[28rem] border-0 rounded-3xl"
          allowFullScreen
          title="Google Slides"
        ></iframe>
      </div>
    </div>
  );
};

export default GoogleSlideEmbed;
