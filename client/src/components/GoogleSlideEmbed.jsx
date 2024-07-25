const GoogleSlideEmbed = ({ embedUrl }) => {
  return (
    <div className="h-1/2 w-[40rem] bg-blue-600 rounded-3xl shadow-xl overflow-hidden">
      <div className="w-[40rem] h-full">
        <iframe
          src={embedUrl}
          className="w-[40rem] h-full border-0"
          allowFullScreen
          title="Google Slides"
        ></iframe>
      </div>
    </div>
  );
};

export default GoogleSlideEmbed;
