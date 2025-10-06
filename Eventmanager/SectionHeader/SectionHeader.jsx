

const SectionHeader = ({ title, subtitle, description, style }) => {
  return (
    <div className={`${style} space-y-6`}>
        {
            subtitle && <h4 className="text-base text-gray-600 font-bold uppercase">{subtitle}</h4>
        }
        {
            title && <h4 className="text-5xl text-gray-800 font-bold">{title}</h4>
        }
        {
            description && <h4 style={{ fontFamily: 'Roboto, sans-serif' }} className="text-base text-gray-600 font-normal">{description}</h4>
        }

    </div>
  );
}
export default SectionHeader