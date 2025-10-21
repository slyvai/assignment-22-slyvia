import { Tabs, Spin } from "antd";
import { useEffect, useState } from "react";
import Students, { getStaticProps } from "./api/students";
import Posts, { getServerSideProps } from "./api/posts";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [studentsData, setStudentsData] = useState([]);
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const { props: studentProps } = await getStaticProps();
      const { props: postProps } = await getServerSideProps();
      setStudentsData(studentProps.students);
      setPostsData(postProps.posts);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20%" }}>
        <Spin size="large" tip="Loading data..." />
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontWeight: "bold", fontSize: 22, marginBottom: 16 }}>
        Student and Post Dashboard
      </h1>

      <Tabs defaultActiveKey="1" centered>
        <Tabs.TabPane tab="Student List" key="1">
          <Students students={studentsData} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Recent Posts" key="2">
          <Posts posts={postsData} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
