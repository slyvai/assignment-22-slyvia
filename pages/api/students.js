import { Table } from "antd";

export default function Students({ students }) {
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Company", dataIndex: ["company", "name"], key: "company" },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h1>Student List</h1>
      <Table columns={columns} dataSource={students} rowKey="id" />
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const students = await res.json();

  return { props: { students } };
}
