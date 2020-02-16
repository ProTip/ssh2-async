FROM ubuntu

RUN apt-get update \
    && apt-get -y install ssh net-tools netcat

RUN useradd -m -p '$6$50YPvOd6$RzWRBTe6FdVh9zjX5TRWypz4IPFGQV3PF7weXrZk22dUSLHzKke/KrbEQHRzUO5msSkGMjMpr72Ry45apfJPg0' test

RUN mkdir /run/sshd

CMD /usr/sbin/sshd -D