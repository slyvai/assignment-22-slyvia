import { List } from "antd";

export default function Posts({ posts }) {
  return (
    <div style={{ padding: 24 }}>
      <h1>Recent Posts</h1>
      <List
        itemLayout="vertical"
        dataSource={posts}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={<b>{item.title}</b>}
              description={item.body}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  return { props: { posts } };
}
