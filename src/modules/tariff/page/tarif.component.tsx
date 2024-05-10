import { hoc } from "@/utils";
import { useTariffProps } from "./tarif.props";
import { Header } from "@/components";
import { Table } from "antd";
import { TariffModal } from "../components";

export const Tariff = hoc(useTariffProps, ({ data, columns, isLoading, open, setOpen, values, onAdd }) => {
    return (
        <div>
            <Header title="Tariff" buttonText="Add Tariff" type="primary" onAdd={onAdd} />
            <div className="mt-4">
                <Table
                    loading={isLoading}
                    className="shadow-md font-semibold"
                    dataSource={data}
                    columns={columns}
                />
            </div>
            <TariffModal modalTitle={values ? "Edit tariff" : 'Create a new tariff'} open={open} onClose={() => setOpen(false)} placement="right" values={values} url="tariff" />
        </div>
    )
})