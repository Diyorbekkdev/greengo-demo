import { DeleteOutlined } from "@ant-design/icons";
import { Card } from "antd";
import dayjs from "dayjs";
interface IRegionCards {
  id: number;
  name: string;
  location: {
    longitude: number;
    latitude: number;
  };
  createdAt: string;
  handleDelete: (id: number) => void;
  flyToRegion: (el: string) => void;
  setIsActiveRegion: (id: number) => void;
  onClose: () => void;
  isActiveRegion: number;
}
const RegionCards = ({
  id,
  name,
  location,
  createdAt,
  handleDelete,
  flyToRegion,
  onClose,
  isActiveRegion,
  setIsActiveRegion,
}: IRegionCards) => {
  return (
    <Card
      style={isActiveRegion === id ? { border: "1.5px solid black" } : {}}
      className="w-full shadow-md mt-2 cursor-pointer hover:shadow-lg border"
      actions={[
        <DeleteOutlined
          key="setting"
          onClick={(event) => {
            event.stopPropagation();
            handleDelete(id);
          }}
        />,
        // <EditOutlined key="edit" />,
      ]}
      onClick={(event) => {
        event.stopPropagation();
        onClose();
        setIsActiveRegion(id);
        flyToRegion(location.longitude + "," + location.latitude);
      }}
    >
      <h3 className="text-lg">{name}</h3>
      <div className="flex items-center  justify-between mt-4">
        <span className="font-semibold">Cordinates:</span>
        <span className="text-blue">
          {location?.longitude}, {location?.latitude}
        </span>
      </div>
      <div className="flex items-center  justify-between mt-4">
        <span className="font-semibold">Created At:</span>
        <span className="text-dark-blue italic">
          {dayjs(createdAt).format("YYYY-MM-DD, HH:mm")}
        </span>
      </div>
    </Card>
  );
};

export default RegionCards;
