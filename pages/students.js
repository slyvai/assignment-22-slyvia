'use client';
import { Table, List, Tabs, Spin } from "antd";
import { useState, useEffect } from "react";

export default function StudentsPage({ students }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch posts client-side (simulating server-side)
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      setPosts(data.slice(0, 10));
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const studentColumns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Website", dataIndex: "website", key: "website" },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ textAlign: "center", marginBottom: 30 }}>
        👩‍💻 Students & Posts Data
      </h1>

      <Tabs
        defaultActiveKey="1"
        type="card"
        items={[
          {
            key: "1",
            label: "Student List (Static Props)",
            children: (
              <Table
                dataSource={students}
                columns={studentColumns}
                rowKey="id"
                bordered
                pagination={false}
              />
            ),
          },
          {
            key: "2",
            label: "Recent Posts (Client Fetch)",
            children: loading ? (
              <div style={{ textAlign: "center", padding: 50 }}>
                <Spin tip="Loading posts..." />
              </div>
            ) : (
              <List
                itemLayout="vertical"
                size="large"
                dataSource={posts}
                renderItem={(post) => (
                  <List.Item key={post.id}>
                    <List.Item.Meta
                      title={<b>{post.title}</b>}
                      description={post.body}
                    />
                  </List.Item>
                )}
              />
            ),
          },
        ]}
      />
    </div>
  );
}

/* ✅ Only keep getStaticProps for students */
export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const students = await res.json();

  return {
    props: { students },
  };
}
