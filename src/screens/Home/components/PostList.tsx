import React, { useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import PostDetails from '../../../components/Post';
import { InfiniteData } from '@tanstack/react-query';
import { InfinetePosts } from '../../../api/getPosts';
import { useTheme } from 'styled-components/native';



type Props = {
    posts: InfiniteData<InfinetePosts> | undefined,
    hasNextPage: boolean,
    fetchNextPage: () => Promise<void>
    refetch: () => Promise<void>
}
const PostList: React.FC<Props> = ({ posts, hasNextPage, fetchNextPage, refetch }) => {


    const theme = useTheme()
    const [refreshFlatList, setRefreshFlatList] = useState(false)


    const onRefreshFlatList = async () => {
        setRefreshFlatList(true)
        await refetch()
        setRefreshFlatList(false)
    }


    return (
        <FlatList
            data={posts?.pages.map(p => p.data).flat()}
            renderItem={({ item }) => <PostDetails enableMaxLenght={true} info={item} />}
            ListFooterComponent={() => hasNextPage ? <ActivityIndicator size={theme.icons.sm} color={theme.colors.contrast} /> : <></>}
            onEndReached={async () => {
                await fetchNextPage()
            }}
            refreshing={refreshFlatList}
            onRefresh={onRefreshFlatList}
        />
    )
}

export default PostList;