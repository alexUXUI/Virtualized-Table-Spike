import React from 'react';
import { AutoSizer, Table, Column } from 'react-virtualized';
import './App.css';

const makeData = () => {
  const sample = [
    ['Frozen yoghurt', 159, 6.0, 24, 4.0],
    ['Ice cream sandwich', 237, 9.0, 37, 4.3],
    ['Eclair', 262, 16.0, 24, 6.0],
    ['Cupcake', 305, 3.7, 67, 4.3],
    ['Gingerbread', 356, 16.0, 49, 3.9],
  ];

  function createData(id, dessert, calories, fat, carbs, protein) {
    return { id, dessert, calories, fat, carbs, protein };
  }
  
  const rows = [];
  
  for (let i = 0; i < 200; i += 1) {
    const randomSelection = sample[Math.floor(Math.random() * sample.length)];
    rows.push(createData(i, ...randomSelection));
  }

  return rows
}

const App = () => <ProductSelector data={makeData()} />

const VirtualizedTable = (props) =>{

  const [list, setList] = React.useState(props.tableData)

  const cellRenderer = ({ cellData, columnIndex, ...args }) => {
    const { columns, rowHeight } = props;
    return (
      <div
        component="div"
        className={'flex-container'}
        style={{ height: rowHeight }}
        align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
      >
        {cellData}
        <input value={cellData} onChange={(event) => {
          setList(
            [
              ...list.map((item, index) => {
                if (index === args.rowData.id) {
                  return {
                    ...item,
                    [args.dataKey]: event.target.value
                  }
                }
                return item
              })
            ]
          )
        }}/>
      </div>
    );
  };

  const headerRenderer = ({ label, columnIndex, columns }) => {
    return (
      <div
        component="div"
        className={'flex-container'}
        variant="head"
        style={{ height: 48 }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        <span>{label}</span>
      </div>
    );
  };

  const { classes, columns, rowHeight, ...tableProps } = props;

  return (
    <AutoSizer>
      {({ height, width }) => {
        return (
          <Table
            height={height}
            width={width}
            rowHeight={48}
            gridStyle={{
              direction: 'inherit',
            }}
            headerHeight={48}
            className={'product-selector'} 
            {...tableProps}
            rowClassName={'flex-container'}
            rowCount={list.length}
            rowGetter={({ index }) => list[index]}
          >
            {
              columns.map(({ dataKey, ...other }, index) => {
                return (
                  <Column
                    key={dataKey}
                    headerRenderer={(headerProps) =>
                      headerRenderer({
                        ...headerProps,
                        columnIndex: index,
                        columns
                      })
                    }
                    className={'flex-container'}
                    cellRenderer={cellRenderer}
                    dataKey={dataKey}
                    {...other}
                  />
                );
              })
              }
          </Table>
        )
      }}
    </AutoSizer>
  );
}

export function ProductSelector({ data }) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <VirtualizedTable
        tableData={data}
        columns={[
          {
            width: 200,
            label: 'Dessert',
            dataKey: 'dessert',
          },
          {
            width: 120,
            label: 'Calories\u00A0(g)',
            dataKey: 'calories',
            numeric: true,
          },
          {
            width: 120,
            label: 'Fat\u00A0(g)',
            dataKey: 'fat',
            numeric: true,
          },
          {
            width: 120,
            label: 'Carbs\u00A0(g)',
            dataKey: 'carbs',
            numeric: true,
          },
          {
            width: 120,
            label: 'Protein\u00A0(g)',
            dataKey: 'protein',
            numeric: true,
          },
        ]}
      />
    </div>
  );
}

export default App;
