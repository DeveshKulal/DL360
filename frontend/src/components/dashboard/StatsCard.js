// components/StatsCard.jsx
const StatsCard = ({ icon, label, value, color }) => {
  return (
    <div className={`bg-${color}-100 p-4 rounded-lg flex-1`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
        {icon}
      </div>
    </div>
  );
};

export default StatsCard;
