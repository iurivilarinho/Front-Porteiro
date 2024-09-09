import { GearIcon, BarChartIcon, CardStackIcon } from "@radix-ui/react-icons"; // Importando ícones disponíveis

const BottomNavBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-green-500 text-white flex justify-around p-4 sm:hidden">
      <div className="flex flex-col items-center">
        <BarChartIcon className="h-6 w-6" />
        <span className="text-xs">Revenue</span>
      </div>
      <div className="flex flex-col items-center">
        <CardStackIcon className="h-6 w-6" />
        <span className="text-xs">Transactions</span>
      </div>
      <div className="flex flex-col items-center">
        <GearIcon className="h-6 w-6" />
        <span className="text-xs">Settings</span>
      </div>
    </div>
  );
};

export default BottomNavBar;
