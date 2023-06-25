import React from 'react'

const RightClickMenu = () => {
  const [visible, setVisible] = useState(false);
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const [value, setValue] = useState();
  const [rowRecord, setRowRecord] = useState();

  const onClick = useCallback(
    (_item) => {
      console.log(value);
      setVisible(false);
    },
    [value]
  );

  const menu = useMemo(() => {
    return (
      <Menu
        style={{ top: posY - 292, left: posX }}
        onClick={onClick}
        items={[
          {
            key: "1",
            label: rowRecord?.name
          },
          {
            key: "2",
            label: rowRecord?.email
          }
        ]}
      />
    );
  }, [onClick, posX, posY, rowRecord]);

  return (
    <div className="App">
      <h1>User Email</h1>
      <Dropdown overlay={menu} visible={visible} trigger={["contextMenu"]}>
        <Table
          onRow={(record, _rowIndex) => {
            return {
              onContextMenu: (event) => {
                event.preventDefault();
                const { clientX, clientY, target } = event;
                setPosX(clientX);
                setPosY(clientY);
                setValue(target.innerHTML);
                setVisible(true);
                setRowRecord(record);
              },
              onClick: () => setVisible(false)
            };
          }}
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </Dropdown>
    </div>
  );
}

export default RightClickMenu