import { Button, Checkbox, Popover } from "antd";
import { CaretUpOutlined } from "@ant-design/icons";
import React from "react";

const PopOverSelect = ({ options, setOptions, title, content }) => {
  const onChangeOptions = (checkedValues) => {
    setOptions(checkedValues);
  };
  return (
    <Popover
      trigger="click"
      placement="top"
      title={title}
      content={
        <Checkbox.Group onChange={onChangeOptions} defaultValue={options}>
          <div className="row">
            {content?.length > 0 ? (
              content.map((elem) => {
                return (
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <Checkbox value={elem.first_name + " " + elem.last_name}>
                      {elem.first_name + " " + elem.last_name}
                    </Checkbox>
                  </div>
                );
              })
            ) : (
              <div className="d-flex justify-content-center">
                <span className="text-center">Aucune donnée</span>
              </div>
            )}
          </div>
        </Checkbox.Group>
      }
    >
      <Button className="d-flex align-items-center w-100 justify-content-between text-muted">
        <span>{title}</span> <CaretUpOutlined />
      </Button>
    </Popover>
  );
};

export default PopOverSelect;
