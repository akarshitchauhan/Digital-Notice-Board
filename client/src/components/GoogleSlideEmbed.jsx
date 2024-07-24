const GoogleSlideEmbed = ({ embedUrl }) => {
  return (
    <div className="h-[40%] bg-blue-600 rounded-xl overflow-hidden">
      <div className="w-full h-full">
        <iframe
          src={embedUrl}
          className="w-full h-full border-0"
          allowFullScreen
          title="Google Slides"
        ></iframe>
      </div>
    </div>
  );
};

export default GoogleSlideEmbed;
